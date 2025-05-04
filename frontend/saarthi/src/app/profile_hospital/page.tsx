'use client';
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaBed, FaUserMd, FaClipboardList } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  profileUrl: string;
}

interface HospitalProfileProps {
  hospitalName: string;
  location: string;
  availableBeds: number;
  topDoctors: Doctor[];
  recentActivities: string[];
}

const HospitalProfilePage: React.FC<HospitalProfileProps> = ({
  hospitalName,
  location,
  availableBeds,
  topDoctors,
  recentActivities,
}) => {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        
        <div className="relative">
          {/* Header Section */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-green-400 flex items-center justify-between px-6 py-4">
            <h1 className="text-4xl font-bold text-white">{hospitalName}</h1>
            <button className="bg-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-800 transition duration-200">
              Apply for a Bed
            </button>
          </div>
          
          {/* Back Button */}
          <button
            className="absolute top-4 left-4 text-white bg-black p-2 rounded-full shadow-lg hover:bg-gray-800 transition duration-200"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>

        {/* Content Section */}
        <div className="px-6 py-8 space-y-8">
          {/* Hospital Info */}
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-4xl text-blue-600" />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{location}</h2>
              <p className="text-gray-600 flex items-center mt-1">
                <FaBed className="mr-2 text-gray-500" /> {availableBeds} Beds Available
              </p>
            </div>
          </div>

          {/* Top Doctors */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Top Doctors</h3>
            <div className="space-y-4">
              {topDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200"
                >
                  <FaUserMd className="text-4xl text-green-500 mr-6" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{doctor.name}</h4>
                    <p className="text-gray-700">{doctor.specialty}</p>
                  </div>
                  <Link href={doctor.profileUrl} className="ml-auto text-blue-500 font-medium hover:underline">
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Community Activity */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Recent Community Activity</h3>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <FaClipboardList className="text-2xl text-blue-500 mr-4" />
                  <p className="text-gray-700">{activity}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const HospitalProfilePageWithAuth = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [hospitalData, setHospitalData] = useState({
    hospitalName: '',
    location: '',
    availableBeds: 0,
    topDoctors: [] as Doctor[],
    recentActivities: [] as string[]
  });

  useEffect(() => {
    const fetchHospitalData = async () => {
      if (!isAuthenticated || !user) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/v1/hospital/profile/${user._id}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setHospitalData({
            hospitalName: data.name || 'Hospital',
            location: data.location || 'Location not specified',
            availableBeds: data.availableBeds || 0,
            topDoctors: data.doctors || [],
            recentActivities: data.activities || []
          });
        } else {
          console.error('Failed to fetch hospital data');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
        router.push('/login');
      }
    };

    fetchHospitalData();
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  return <HospitalProfilePage {...hospitalData} />;
};

export default HospitalProfilePageWithAuth;
