// src/Components/HowItWorks.tsx
import { motion } from "framer-motion";
import { FaUserPlus, FaCloudUploadAlt, FaEdit, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus className="text-4xl" />,
    title: "Sign Up",
    description: "Choose your role as a YouTuber or Editor and create your account in seconds.",
  },
  {
    icon: <FaCloudUploadAlt className="text-4xl" />,
    title: "Upload Content",
    description: "Easily upload your video drafts or raw footage to start the collaboration.",
  },
  {
    icon: <FaEdit className="text-4xl" />,
    title: "Collaborate",
    description: "Work together in real-time with commenting, version control, and instant feedback.",
  },
  {
    icon: <FaCheckCircle className="text-4xl" />,
    title: "Publish",
    description: "Review the final edit and publish directly to your YouTube channel.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              How It Works
            </span>
          </h3>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get started with StudioSync in four simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg dark:shadow-none hover:shadow-xl dark:hover:shadow-md transition-all duration-300"
            >
              <div className="text-indigo-600 dark:text-indigo-400 mb-6 bg-indigo-50 dark:bg-indigo-900 w-16 h-16 rounded-xl flex items-center justify-center mx-auto">
                {step.icon}
              </div>
              <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{step.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
