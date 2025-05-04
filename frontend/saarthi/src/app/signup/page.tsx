"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const router = useRouter();
  const [role, setRole] = useState("patient");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const signup = async () => {
    setIsLoading(true);
    try {
      if (role === 'patient') {
        const response = await fetch('http://localhost:4000/User/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullname: username,
            email: email,
            password: password,
            gender: "",
            dateOfBirth: "",
            contact: phone,
            address: ""
          })
        });
        const data = await response.json();
        console.log(data);
        if (response.status == 201) {
          localStorage.setItem('userId', data.user._id);
          localStorage.setItem('email', data.user.email);
          router.push('/patient');
        }
      }
    } catch (error) {
      console.error(error);
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
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">
          {role === "patient" ? "Patient Signup" : "Hospital Signup"}
        </h1>

        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-lg ${
              role === "patient" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg ${
              role === "hospital" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => setRole("hospital")}
          >
            Hospital
          </button>
        </div>

        <form>
          <div className="mb-4 relative">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder=" "
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none">
              Name
            </label>
          </div>
          <div className="mb-4 relative">
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none">
              Email
            </label>
          </div>
          <div className="mb-4 relative">
            <input
              type="tel"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder=" "
              onChange={(e) => setPhone(e.target.value)}
            />
            <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none">
              Contact
            </label>
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none">
              Password
            </label>
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {role === "hospital" && (
            <div className="mb-4 relative">
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                placeholder=" "
              />
              <label className="absolute left-3 top-3 text-gray-500 dark:text-gray-400 transition-all duration-200 pointer-events-none">
                Hospital Name
              </label>
            </div>
          )}

          <button
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            onClick={signup}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

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

        <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
