import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Travel Experience?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who are discovering new destinations and
            creating unforgettable memories with WanderAI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={"/create-trip"}>
              <Button
                size="lg"
                className="text-lg px-8 bg-gradient-to-r from-purple-400 to-pink-600"
              >
                Start Planning Now
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-purple-500 mb-2">
                10k+
              </span>
              <span className="text-gray-300">Happy Travelers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-purple-500 mb-2">
                150+
              </span>
              <span className="text-gray-300">Destinations</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-purple-500 mb-2">
                98%
              </span>
              <span className="text-gray-300">Satisfaction Rate</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
