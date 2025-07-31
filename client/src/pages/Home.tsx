// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HowItWorks from "../Components/HowItWorks";
import { FaPlay } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaPlay className="text-indigo-600 text-xl rotate-90" />
            <h1 className="text-2xl font-bold text-indigo-600">StudioSync</h1>
          </div>
          <nav className="space-x-6">
            <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Connect. Collaborate.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Create Content Faster.
              </span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              StudioSync simplifies video production by connecting YouTubers with Editors for seamless collaboration, real-time sharing, and confident publishing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup?role=youtuber">
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg">
                  I'm a YouTuber
                </button>
              </Link>
              <Link to="/signup?role=editor">
                <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg border border-gray-200">
                  I'm an Editor
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <img 
              src="/collaboration.png" 
              alt="Collaboration" 
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            />
          </motion.div>
        </div>

        <HowItWorks />
      </main>

      <footer className="bg-white/70 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              © {new Date().getFullYear()} StudioSync. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
