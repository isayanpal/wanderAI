import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 w-screen left-[calc(-50vw+50%)]">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-pink-500/10 rounded-full blur-[80px] -z-10" />

      <div className="container mx-auto px-4 z-10 w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
          >
            <span className="flex h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-600"></span>
            <span className="text-sm font-medium text-gray-200 tracking-wide ">
              Wander AI
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              <span className="block text-white drop-shadow-sm">
                Travel Smarter with
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500 animate-gradient-x">
                AI-Powered Planning
              </span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Experience the future of travel. WanderAI curates personalized
              itineraries tailored to your unique tastes, ensuring every journey
              is unforgettable.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link to={"/create-trip"} className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-8 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/25 transition-all hover:scale-105 active:scale-95"
              >
                Start Generating Trip
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
