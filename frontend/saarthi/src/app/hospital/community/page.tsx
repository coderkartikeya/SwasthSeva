'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaHospital, FaComments, FaHeart, FaShare, FaBookmark, FaEllipsisH } from 'react-icons/fa';

interface Post {
  id: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

const HospitalCommunity = () => {
  const [posts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: "Dr. Sarah Johnson",
        role: "Cardiologist",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      content: "Just completed a successful heart transplant surgery. The patient is recovering well. Team effort makes the dream work! 💪",
      likes: 245,
      comments: 32,
      shares: 15,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      author: {
        name: "City General Hospital",
        role: "Healthcare Institution",
        avatar: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      content: "We're proud to announce the opening of our new pediatric wing! State-of-the-art facilities and expert staff ready to serve our youngest patients. 🏥",
      likes: 189,
      comments: 45,
      shares: 28,
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      author: {
        name: "Dr. Michael Chen",
        role: "Neurologist",
        avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
      },
      content: "Excited to share our latest research findings on early detection of neurodegenerative diseases. Collaboration with leading institutions worldwide has been incredible.",
      likes: 156,
      comments: 23,
      shares: 12,
      timestamp: "1 day ago"
    }
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Healthcare Community
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Connect, share, and learn from healthcare professionals worldwide
          </p>
        </motion.div>

        {/* Create Post Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <FaUserMd className="text-xl" />
            </div>
            <input
              type="text"
              placeholder="Share your thoughts, achievements, or updates..."
              className="flex-1 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                <FaComments />
                <span>Add Photo</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                <FaHospital />
                <span>Tag Hospital</span>
              </button>
            </div>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200">
              Post
            </button>
          </div>
        </motion.div>

        {/* Posts Feed */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {post.author.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.author.role} • {post.timestamp}
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <FaEllipsisH />
                  </button>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                      <FaHeart />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                      <FaComments />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400">
                      <FaShare />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <button className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                    <FaBookmark />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalCommunity; 