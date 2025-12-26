import { motion } from "framer-motion";
import "./App.css";
import CallToAction from "./components/custom/CallToAction";
import FeaturesSection from "./components/custom/FeaturesSection";
import Hero from "./components/custom/Hero";
import HowItWorks from "./components/custom/HowItWorks";

function App() {
  return (
    <div className="relative text-white min-h-screen overflow-hidden flex flex-col items-center">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-52 h-52 bg-green-400/20 blur-3xl rounded-full"
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-72 h-72 bg-blue-400/20 blur-3xl rounded-full"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-40 right-60 w-64 h-64 bg-purple-500/20 blur-3xl rounded-full"
        animate={{ rotate: [0, 180, 360] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl px-6 sm:px-12">
        <Hero />
        <FeaturesSection />
        <HowItWorks />
        <CallToAction />
      </div>
    </div>
  );
}

export default App;
