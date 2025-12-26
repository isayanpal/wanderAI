import { motion } from "framer-motion";

import { Calendar, Compass, Map, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: <Map className="h-6 w-6 text-purple-400" />,
    title: "AI-Powered Planning",
    description:
      "Our advanced AI analyzes your preferences to curate personalized destination recommendations, hotels, and activities that match your unique travel style perfectly.",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: <Calendar className="h-6 w-6 text-purple-400" />,
    title: "Smart Itineraries",
    description:
      "Get detailed, minute-by-minute daily plans that intelligently adapt to your pace and preferences, optimizing routes to save you travel time.",
    className: "md:col-span-1 lg:col-span-2",
  },
  {
    icon: <Compass className="h-6 w-6 text-purple-400" />,
    title: "Trip Management",
    description:
      "Centralize all your bookings, tickets, and reservations in one intuitive dashboard. Access your complete travel plan offline and update it on the fly.",
    className: "md:col-span-1 lg:col-span-2",
  },
  {
    icon: <Shield className="h-6 w-6 text-purple-400" />,
    title: "Secure & Private",
    description:
      "We prioritize your privacy with enterprise-grade encryption. Your personal data and travel history are securely stored and never shared without permission.",
    className: "md:col-span-1 lg:col-span-1",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-purple-400" />,
    title: "Mobile First",
    description:
      "Experience a fully responsive design that works flawlessly on any device. Manage your entire trip from your phone, whether you're at home or exploring a new city.",
    className: "md:col-span-2 lg:col-span-3",
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-purple-500/50 ${feature.className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 transition-colors group-hover:bg-purple-500/20">
          {feature.icon}
        </div>
        <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-purple-300">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed transition-colors group-hover:text-gray-300 flex-grow">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 sm:py-20 relative overflow-hidden">
      {/* Background blobs for visual interest */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-purple-400 font-medium tracking-wider uppercase text-xs mb-2 block">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Why Choose WanderAI?
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            We combine advanced AI with travel expertise to create the perfect
            journey for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
