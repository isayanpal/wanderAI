import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Search, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-6 w-6 text-white" />,
    title: "Share Preferences",
    description: "Tell us about your travel style, interests, and budget.",
    color: "bg-blue-500",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-white" />,
    title: "Get Recommendations",
    description: "Our AI suggests personalized destinations and activities.",
    color: "bg-purple-500",
  },
  {
    icon: <Calendar className="h-6 w-6 text-white" />,
    title: "Customize Itinerary",
    description: "Fine-tune your trip with easy drag-and-drop tools.",
    color: "bg-pink-500",
  },
  {
    icon: <MapPin className="h-6 w-6 text-white" />,
    title: "Start Traveling",
    description: "Access your plan anywhere and enjoy your journey.",
    color: "bg-orange-500",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-pink-500 font-medium tracking-wider uppercase text-sm mb-3 block">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            How It Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From planning to exploring, we make every step seamless and
            exciting.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-orange-500/30 -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <div className="flex flex-col items-center text-center h-full">
                {/* Icon Circle */}
                <div
                  className={`w-20 h-20 rounded-2xl ${step.color} shadow-lg shadow-purple-900/20 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                  <div className="absolute -bottom-3 bg-gray-900 border border-gray-800 text-gray-400 text-xs font-bold px-2 py-1 rounded-full">
                    0{index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors w-full flex-1 flex flex-col justify-start">
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow for mobile/tablet flow indication, hidden on desktop last item */}
              {index < steps.length - 1 && (
                <div className="lg:hidden absolute top-28 left-1/2 -translate-x-1/2 text-gray-600">
                  <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
