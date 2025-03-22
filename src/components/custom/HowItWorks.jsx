import { motion } from "framer-motion"
import { Search, Sparkles, Calendar, MapPin } from "lucide-react"

const steps = [
  {
    icon: <Search className="h-8 w-8 text-purple-500" />,
    title: "Tell us your preferences",
    description: "Share your travel style, interests, and budget to help our AI understand what you're looking for.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-purple-500" />,
    title: "Get AI recommendations",
    description: "Our AI analyzes thousands of options to suggest destinations and activities tailored to you.",
  },
  {
    icon: <Calendar className="h-8 w-8 text-purple-500" />,
    title: "Customize your itinerary",
    description: "Fine-tune your plan with our easy drag-and-drop interface to create your perfect trip.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-purple-500" />,
    title: "Enjoy your journey",
    description: "Access your itinerary anytime, anywhere with real-time updates and recommendations.",
  },
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How WanderAI Works</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Planning your dream trip has never been easier. Follow these simple steps to get started.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5 bg-gradient-to-r from-purple-900/50 via-purple-600 to-purple-900/50"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center relative bg-black/50 backdrop-blur-3xl p-3 py-6 rounded-lg shadow-lg"
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-6 relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center border border-purple-600">
                  {step.icon}
                </div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
