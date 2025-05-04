'use client'
import SideNav from '@/app/components/SideNav';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaHospital, FaPhone, FaUser, FaBed, FaExclamationTriangle, FaCheckCircle, FaDatabase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { blockchainService } from '@/app/services/blockchainService';
import { extractNames } from '@/app/utils/nameExtractor';

// Set the app element for react-modal to fix the warning
// if (typeof document !== 'undefined') {
//   Modal.setAppElement('#__next'); // Assuming Next.js default root element
// }

// Define RowType
type RowType = {
  hospitalID: string;
  hospitalName: string;
  totalFreeBed: string;
  totalFreeCriticalBedWithoutVentilator: string;
  totalFreeCriticalBedWithVentilator: string;
  totalFreeNonCriticalBed: string;
  availableFreeCriticalBedWithoutVentilator: string;
  availableFreeCriticalBedWithVentilator: string;
  availableFreeNonCriticalBed: string;
  hospitalPhoneNumber: string;
  contactPersonName: string;
};

// Custom styles for the modal popup
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center' as const,
    borderRadius: '15px',
    border: '2px solid #333',
    padding: '20px',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
};

const HospitalInfo = () => {
  const [hospitals, setHospitals] = useState<RowType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isStoring, setIsStoring] = useState<{ [key: string]: boolean }>({});
  const [storeStatus, setStoreStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();

        // Log the data to see what you actually get
        console.log(data);

        // Check if data contains tableData
        if (data && data.tableData) {
          // Sort hospitals by availableFreeNonCriticalBed (less waiting time first)
          const sortedData = data.tableData.sort(
            (a: RowType, b: RowType) =>
              parseInt(b.availableFreeNonCriticalBed) -
              parseInt(a.availableFreeNonCriticalBed)
          );

          setHospitals(sortedData);
        } else {
          throw new Error("Data structure is not as expected.");
        }
      } catch (err) {
        console.error("Failed to fetch hospital data:", err);
        setError("Failed to load hospital data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleStoreInBlockchain = async (hospital: RowType) => {
    try {
      setIsStoring(prev => ({ ...prev, [hospital.hospitalID]: true }));
      setStoreStatus(prev => ({ ...prev, [hospital.hospitalID]: 'Connecting wallet...' }));

      // Connect wallet
      const connected = await blockchainService.connectWallet();
      if (!connected) {
        throw new Error('Failed to connect wallet');
      }

      setStoreStatus(prev => ({ ...prev, [hospital.hospitalID]: 'Storing data...' }));

      // Store data in blockchain
      const result = await blockchainService.storeHospitalData(hospital);
      
      if (result.success) {
        setStoreStatus(prev => ({ 
          ...prev, 
          [hospital.hospitalID]: `Stored successfully! TX: ${result.transactionHash.slice(0, 6)}...` 
        }));
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      setStoreStatus(prev => ({ 
        ...prev, 
        [hospital.hospitalID]: `Error: ${error.message || 'Unknown error occurred'}` 
      }));
    } finally {
      setIsStoring(prev => ({ ...prev, [hospital.hospitalID]: false }));
    }
  };

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="text-red-500 text-center p-4 bg-white rounded-lg shadow-md">
          <FaExclamationTriangle className="mx-auto mb-2" size={24} />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SideNav name="beds" />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4 md:ml-[280px]">
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <h2 className="text-xl font-bold mb-4">Delhi Government Data</h2>
          <p className="text-gray-700">The following data is provided by the Delhi Government and is subject to updates.</p>
          <button
            onClick={closeModal}
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none transition-colors duration-200"
          >
            Close
          </button>
        </Modal>

        <div className="container mx-auto mt-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
            Hospital Bed Availability
          </h1>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search hospitals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <FaHospital className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHospitals.map((hospital, index) => {
              const isWaiting = parseInt(hospital.availableFreeNonCriticalBed) <= 0;
              const names = extractNames(hospital);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-6 rounded-xl shadow-lg transition-all duration-200 ${
                    isWaiting
                      ? 'bg-red-50 border-l-4 border-red-500'
                      : 'bg-white border-l-4 border-green-500'
                  } hover:shadow-xl`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      {names.hospitalName}
                    </h3>
                    {isWaiting ? (
                      <FaExclamationTriangle className="text-red-500" size={20} />
                    ) : (
                      <FaCheckCircle className="text-green-500" size={20} />
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <FaBed className="mr-2" />
                      <span className="font-semibold">Total Free Beds:</span>
                      <span className="ml-2">{hospital.totalFreeBed}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FaBed className="mr-2" />
                      <span className="font-semibold">Critical (Without Ventilator):</span>
                      <span className="ml-2">{hospital.totalFreeCriticalBedWithoutVentilator}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FaBed className="mr-2" />
                      <span className="font-semibold">Critical (With Ventilator):</span>
                      <span className="ml-2">{hospital.totalFreeCriticalBedWithVentilator}</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                      <FaBed className="mr-2" />
                      <span className="font-semibold">Non-Critical Beds:</span>
                      <span className="ml-2">{hospital.totalFreeNonCriticalBed}</span>
                    </div>

                    <div className={`text-lg font-semibold mt-4 p-2 rounded-lg ${
                      isWaiting ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      Available Non-Critical Beds: {hospital.availableFreeNonCriticalBed}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center text-gray-600">
                        <FaUser className="mr-2" />
                        <span className="font-semibold">Contact Person:</span>
                        <span className="ml-2">{names.contactName}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mt-2">
                        <FaPhone className="mr-2" />
                        <span className="font-semibold">Phone:</span>
                        <span className="ml-2">{hospital.hospitalPhoneNumber}</span>
                      </div>
                    </div>

                    {/* Blockchain Storage Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleStoreInBlockchain(hospital)}
                        disabled={isStoring[hospital.hospitalID]}
                        className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
                          isStoring[hospital.hospitalID]
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        } text-white transition-colors duration-200`}
                      >
                        <FaDatabase />
                        <span>
                          {isStoring[hospital.hospitalID] ? 'Storing...' : 'Store in Blockchain'}
                        </span>
                      </button>
                      {storeStatus[hospital.hospitalID] && (
                        <p className="mt-2 text-sm text-gray-600">
                          {storeStatus[hospital.hospitalID]}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalInfo;
