import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const Button = ({ children, to, className }) => (
  <Link to={to}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-3 rounded-full text-lg font-semibold transition-colors ${className}`}
    >
      {children}
    </motion.button>
  </Link>
);

export default function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center bg-black text-white px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl mt-10 sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          Plan Your Dream Trip with AI Ease
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-300 mb-8"
        >
          Discover personalized itineraries, top destinations, and seamless travel
          planning—all powered by intelligent AI
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button
            to="/create-trip"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-12 w-full max-w-4xl"
      >
        <img
          src="/heroImg.webp"
          alt="AI-powered travel planning"
          className="w-full h-auto rounded-2xl shadow-2xl"
        />
      </motion.div>
    </div>
  );
}

