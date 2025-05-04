'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaHospitalAlt, FaMapMarkerAlt, FaBed } from 'react-icons/fa';
import SideNav from '@/app/components/SideNav';

// Define the Hospital interface
interface Hospital {
  _id: string;
  name: string;
  email: string;
  address: string;
  patientAddmissions: number;
  totalDoctors: number;
  contact: string;
}

const HospitalListPage = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch('http://localhost:4000/hospital/hospitals');
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals');
        }
        const data = await response.json();
        setHospitals(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchHospitals();
  }, []);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SideNav name="hospital" />
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-r from-green-200 to-blue-200 rounded-xl shadow-lg mt-10 md:ml-[300px]">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Available Hospitals</h1>

        <div className="space-y-6">
          {hospitals.map((hospital) => (
            <div
              key={hospital._id}
              className="flex items-center bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <FaHospitalAlt className="text-green-500 text-4xl mr-4" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">{hospital.name}</h2>
                <div className="text-gray-600 mb-2 flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" /> {hospital.address}
                </div>
                <div className="text-gray-600 flex items-center">
                  <FaBed className="mr-2 text-gray-500" /> {hospital.patientAddmissions} Patient Admissions
                </div>
                <div className="text-gray-600 flex items-center">
                  <FaBed className="mr-2 text-gray-500" /> {hospital.totalDoctors} Total Doctors
                </div>
                <div className="text-gray-600 flex items-center">
                  <FaBed className="mr-2 text-gray-500" /> {hospital.contact} Contact
                </div>
              </div>
              <Link href={`/hospitals/${hospital._id}`}>
                <div className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                  View Profile
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalListPage;
