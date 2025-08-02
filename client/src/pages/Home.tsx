import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HowItWorks from "../Components/HowItWorks";
import { FaPlay } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <header className="bg-gray-900/60 backdrop-blur-md shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaPlay className="text-indigo-500 text-xl rotate-90" />
            <h1 className="text-2xl font-bold text-indigo-400">StudioSync</h1>
          </div>
          <nav className="space-x-6">
            <Link to="/login" className="text-gray-300 hover:text-indigo-400 transition-colors">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-md hover:shadow-lg">
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Connect. Collaborate.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">
                Create Content Faster.
              </span>
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl">
              StudioSync empowers YouTubers and Editors to co-create in real-time. Upload, share, and review video content with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup?role=youtuber">
                <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg hover:shadow-indigo-600/40 transition-all duration-300 font-medium text-lg">
                  I'm a YouTuber
                </button>
              </Link>
              <Link to="/signup?role=editor">
                <button className="w-full sm:w-auto px-8 py-4 border border-gray-700 text-gray-200 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-md font-medium text-lg">
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
              src="/collaboration-dark.png" // you can swap this for a dark-mode-friendly image
              alt="Collaboration"
              className="w-full max-w-lg mx-auto rounded-lg shadow-xl hover:shadow-indigo-700/40 transition-all duration-300"
            />
          </motion.div>
        </div>

        <div className="mt-20">
          <HowItWorks  />
        </div>
      </main>

      <footer className="bg-gray-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">
              © {new Date().getFullYear()} StudioSync. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
