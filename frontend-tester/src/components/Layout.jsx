// src/components/Layout.jsx

import { Outlet, useLocation, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/solid'; // Importing icons from Heroicons

function Layout({ isDarkMode, toggleDarkMode }) {
  const location = useLocation();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

  // Mock currentUser object for demonstration
  const currentUser = {
    name: 'Admin Name',
    profilePicture: ' ../assets/images/pfp.jpg' // Replace with the actual path to the profile picture
  };

  useEffect(() => {
    if (location.pathname !== '/') {
      setShowWelcomeMessage(false);
    } else {
      setShowWelcomeMessage(true);
    }
  }, [location]);

  return (
    <div className={`flex ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Sidebar />
      <div className="flex-1 p-4 relative">
        {/* Profile Icon */}
        <Link to="/myaccount" className="absolute top-4 right-20">
          <img
            src={currentUser.profilePicture} // Use the profile picture from currentUser
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-gray-300 cursor-pointer transition duration-300 hover:shadow-lg"
          />
        </Link>

        {/* Toggle Button with Half Moon Icon */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded-full border focus:outline-none bg-gray-300 hover:bg-gray-400 transition duration-300"
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-blue-500" />
          )}
        </button>

        {showWelcomeMessage ? (
          <div className="text-center text-xl">
            <h1>Welcome Admin, Hope you're doing well!</h1>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default Layout;
