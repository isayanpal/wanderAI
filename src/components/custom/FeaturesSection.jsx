import { motion } from "framer-motion"
import { Map, Calendar, Compass, Shield, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"


const features = [
  {
    icon: <Map className="h-10 w-10 text-purple-500" />,
    title: "AI-Powered Trip Planning",
    description:
      "Get smart suggestions for destinations, hotels, and places to visit based on your preferences and travel history.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-purple-500" />,
    title: "Customizable Itineraries",
    description: "Plan your trips step by step with intuitive tools that adapt to your schedule and preferences.",
  },
  {
    icon: <Compass className="h-10 w-10 text-purple-500" />,
    title: "Trip Management",
    description: "View and manage your planned trips easily with our organized dashboard and reminder system.",
  },
  {
    icon: <Shield className="h-10 w-10 text-purple-500" />,
    title: "Protected Routes",
    description: "Ensure secure access with user-based route protection and encrypted personal information.",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-purple-500" />,
    title: "Responsive UI",
    description: "Enjoy a seamless experience on any device, from desktop to mobile, thanks to our adaptive interface.",
  },
]

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-gray-900/50 border-gray-800 hover:border-purple-800/50 transition-all duration-300">
        <CardHeader>
          <div className="mb-4">{feature.icon}</div>
          <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300 text-base">{feature.description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powerful Features</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover how WanderAI transforms your travel planning experience with these innovative features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

