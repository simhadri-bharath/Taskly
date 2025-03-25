import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white relative">
      {/* Top Navbar */}
      <div className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
        <h1 className="text-2xl font-bold">Task Reminder</h1>
        {/* Menu Button (Always Visible) */}
        <button onClick={() => setIsOpen(true)} className="text-white">
          <FaBars size={30} /> {/* Menu Icon */}
        </button>
      </div>

      {/* Sidebar Overlay (Click to close) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Side Navbar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-6 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-20`}
      >
        {/* Close Button (X Icon) */}
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white">
          <FaTimes size={30} />
        </button>

        <h2 className="text-lg font-bold mb-6">Navigation</h2>
        <nav className="space-y-4">
          <button
            onClick={() => { navigate("/login"); setIsOpen(false); }}
            className="block w-full bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={() => { navigate("/register"); setIsOpen(false); }}
            className="block w-full bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Register
          </button>
          <button
            onClick={() => { navigate("/task"); setIsOpen(false); }}
            className="block w-full bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
          >
            Tasks
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
        <h2 className="text-3xl font-bold mb-4">Stay on Track with Your Tasks!</h2>
        <p className="max-w-lg text-lg text-gray-300 mb-6">
          Task reminders help you stay productive and manage your daily 
          responsibilities efficiently. Stay focused, organized, and on top 
          of your goals with our task management system.
        </p>
        <button
          onClick={() => navigate("/register")}
          className="bg-blue-500 text-white px-6 py-3 rounded text-lg hover:bg-blue-600"
        >
          Get Started
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-center p-4 mt-auto">
        <p>© 2025 Task Reminder. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
