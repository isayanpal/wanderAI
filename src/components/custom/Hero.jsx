import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center">
              <span className="text-white font-bold">W</span>
            </div>
            <span className="text-xl font-bold">WanderAI</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold p-4 mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Travel Smarter with AI-Powered Planning
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              WanderAI creates personalized travel experiences tailored to your
              preferences, making every journey unforgettable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to={"/create-trip"}>
            <Button
              size="lg"
              className="text-lg px-8 bg-gradient-to-r from-purple-400 to-pink-600"
              >
              Get Started
            </Button>
              </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
