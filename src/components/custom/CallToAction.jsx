import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-pink-900/50 -z-20" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl -z-10" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] -z-10" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[100px] -z-10" />

          <div className="relative px-6 py-16 sm:px-12 sm:py-24 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
              Ready to Transform <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Your Travel Experience?
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of modern travelers who are discovering smarter
              ways to explore the world with WanderAI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to={"/create-trip"}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 h-14 rounded-full bg-white text-black hover:bg-gray-100 font-bold shadow-xl shadow-white/10 transition-all hover:scale-105 active:scale-95"
                >
                  Start Planning Free
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-10">
              <div className="flex flex-col items-center p-4">
                <span className="text-4xl md:text-5xl font-bold text-white mb-2">
                  10k+
                </span>
                <span className="text-purple-300 font-medium">
                  Happy Travelers
                </span>
              </div>
              <div className="flex flex-col items-center p-4 border-t sm:border-t-0 sm:border-l border-white/10">
                <span className="text-4xl md:text-5xl font-bold text-white mb-2">
                  150+
                </span>
                <span className="text-purple-300 font-medium">
                  Countries Covered
                </span>
              </div>
              <div className="flex flex-col items-center p-4 border-t sm:border-t-0 sm:border-l border-white/10">
                <span className="text-4xl md:text-5xl font-bold text-white mb-2">
                  4.9/5
                </span>
                <span className="text-purple-300 font-medium">User Rating</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
