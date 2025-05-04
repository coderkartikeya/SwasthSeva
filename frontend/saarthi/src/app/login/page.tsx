'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const login = async () => {
    setIsLoading(true);
    try {
      let endpoint = '';
      if (role === "patient") {
        endpoint = 'http://localhost:8000/api/v1/user/login';
      } else if (role === "hospital") {
        endpoint = 'http://localhost:8000/api/v1/hostpial/login';
      } else {
        console.error('Invalid role');
        return;
      }

      const request = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const response = await request.json();
      console.log(response);

      if (request.status === 200) {
        // Use the auth context to login with token
        authLogin({
          _id: response.user._id,
          email: response.user.email,
          role: role as 'patient' | 'hospital'
        }, response.token);

        if (role === "patient") {
          router.push('/patient');
        } else {
          router.push('/hospital');
        }
      } else {
        console.error('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-md w-full p-8"
      >
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? '🌞' : '🌙'}
          </button>
        </div>
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {role === "patient" ? "Patient Login" : "Hospital Login"}
        </h1>

        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              role === "patient" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              role === "hospital" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => setRole("hospital")}
          >
            Hospital
          </button>
        </div>

        <div className="mb-4 relative">
          <input
            type="email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600"
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <label className="absolute left-3 top-3 text-gray-600 dark:text-gray-400 transition-all duration-200 pointer-events-none">
            Email
          </label>
        </div>

        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 text-gray-900 dark:text-white dark:border-gray-600"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <label className="absolute left-3 top-3 text-gray-600 dark:text-gray-400 transition-all duration-200 pointer-events-none">
            Password
          </label>
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-600 dark:text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          onClick={login}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            "Login"
          )}
        </button>

        <div className="mt-4 flex justify-center space-x-4">
          <button className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200">
            <FaGoogle />
          </button>
          <button className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
            <FaFacebook />
          </button>
          <button className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors duration-200">
            <FaTwitter />
          </button>
        </div>

        <p className="text-center text-gray-700 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
