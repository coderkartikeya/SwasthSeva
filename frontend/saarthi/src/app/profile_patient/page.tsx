'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle, FaCommentDots, FaHistory, FaFileMedical, FaPhone, FaEnvelope, FaMapMarkerAlt, FaEdit, FaIdCard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

interface PatientProfileProps {
  patientName: string;
  recentComments: string[];
  email?: string;
  phone?: string;
  address?: string;
  medicalHistory?: string[];
  isVerified?: boolean;
}

const PatientProfilePage: React.FC<PatientProfileProps> = ({
  patientName,
  recentComments,
  email = 'Not provided',
  phone = 'Not provided',
  address = 'Not provided',
  medicalHistory = [],
  isVerified = false
}) => {
  const router = useRouter();

  const handleVerification = () => {
    router.push('/verification');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="relative h-56 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
            <div className="absolute -bottom-20 left-8">
              <div className="w-40 h-40 rounded-full bg-white dark:bg-gray-700 p-2 shadow-lg border-4 border-white dark:border-gray-800">
                <FaUserCircle className="w-full h-full text-blue-500 dark:text-blue-400" />
              </div>
            </div>
            <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors duration-200">
              <FaEdit className="w-5 h-5" />
            </button>
          </div>
          <div className="pt-24 pb-8 px-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{patientName}</h1>
              <div className="flex items-center space-x-2">
                {isVerified ? (
                  <span className="flex items-center text-green-500 dark:text-green-400">
                    <FaCheckCircle className="mr-2" />
                    Verified
                  </span>
                ) : (
                  <button
                    onClick={handleVerification}
                    className="flex items-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                  >
                    <FaIdCard className="mr-2" />
                    Verify Account
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <FaEnvelope className="text-blue-500 dark:text-blue-400" />
                <span className="font-medium">{email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <FaPhone className="text-blue-500 dark:text-blue-400" />
                <span className="font-medium">{phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                <FaMapMarkerAlt className="text-blue-500 dark:text-blue-400" />
                <span className="font-medium">{address}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Verification Notice */}
        {!isVerified && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-3xl p-6 mb-8"
          >
            <div className="flex items-start space-x-4">
              <FaIdCard className="text-yellow-500 dark:text-yellow-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Account Verification Required
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Please verify your account to access all features. You'll need to provide a valid ID proof.
                </p>
                <button
                  onClick={handleVerification}
                  className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl transition-colors duration-200"
                >
                  Start Verification
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Medical History Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
              <FaHistory className="mr-3 text-blue-500 dark:text-blue-400" />
              Medical History
            </h2>
            <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center space-x-2">
              <FaEdit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>
          <div className="space-y-4">
            {medicalHistory.length > 0 ? (
              medicalHistory.map((record, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 flex items-start space-x-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <FaFileMedical className="text-blue-500 dark:text-blue-400 mt-1" />
                  <p className="text-gray-800 dark:text-gray-200">{record}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400 italic">No medical history available</p>
            )}
          </div>
        </motion.div>

        {/* Recent Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
              <FaCommentDots className="mr-3 text-blue-500 dark:text-blue-400" />
              Recent Community Comments
            </h2>
            <button className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 flex items-center space-x-2">
              <FaEdit className="w-4 h-4" />
              <span>New Comment</span>
            </button>
          </div>
          <div className="space-y-6">
            {recentComments.length > 0 ? (
              recentComments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700/50 dark:to-gray-600/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start space-x-4">
                    <FaCommentDots className="text-2xl text-blue-500 dark:text-blue-400 mt-1" />
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{comment}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400 italic">No recent comments</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PatientProfilePageWithAuth = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientData, setPatientData] = useState({
    patientName: '',
    recentComments: [] as string[],
    email: '',
    phone: '',
    address: '',
    medicalHistory: [] as string[],
    isVerified: false
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        // Check if we have a token
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          router.push('/login');
          return;
        }

        // Check if we have a user ID
        if (!user?._id) {
          console.log('No user ID found');
          router.push('/login');
          return;
        }

        console.log('Fetching data for user:', user._id);
        const response = await fetch(`http://localhost:8000/api/v1/user/profile/${user._id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Received data:', data);
          setPatientData({
            patientName: data.fullname || 'Patient',
            recentComments: data.comments || [],
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            medicalHistory: data.medicalHistory || [],
            isVerified: data.isVerified || false
          });
          setError(null);
        } else {
          const errorData = await response.json();
          console.error('API Error:', errorData);
          setError(errorData.message || 'Failed to fetch patient data');
          if (response.status === 401) {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
        setError('An error occurred while fetching your data');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error Loading Profile</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-colors duration-200"
            >
              Return to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!user?._id) {
    return null;
  }

  return <PatientProfilePage {...patientData} />;
};

export default PatientProfilePageWithAuth;
