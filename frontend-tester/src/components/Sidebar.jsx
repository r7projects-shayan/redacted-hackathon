// src/components/Sidebar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaWallet, FaCalendarAlt, FaBars, FaHome, FaClipboardList, FaBell, FaShieldAlt, FaTasks, FaChevronLeft, FaChevronRight, FaRobot, FaUserCircle } from 'react-icons/fa'; // Import additional icons

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-gray-800 z-20 text-white ${isCollapsed ? 'w-16' : 'w-64'} transition-all min-h-screen`}>
      <div className="flex items-center justify-between p-4">
        {/* Admin Dashboard Label with Arrow Icon */}
        <span className="text-xl font-bold flex items-center cursor-pointer" onClick={toggleSidebar}>
          {isCollapsed ? (
            <FaChevronRight />
          ) : (
            <>
              <span>ColabCube Admin</span>
              <FaChevronLeft className="ml-2" />
            </>
          )}
        </span>
      </div>
      <ul className="mt-4">
        {/* Home Link */}
        <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/home" className="flex items-center">
            <FaHome className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span>Home</span>}
          </Link>
        </li>

        {/* Users Link */}
        <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/users" className="flex items-center">
            <FaUsers className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span>Users</span>}
          </Link>
        </li>
        
         {/* Evnets Link */}
         <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/events" className="flex items-center">
            <FaCalendarAlt className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span>Events</span>}
          </Link>
        </li>


        {/* Tokens Management Link */}
        <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/tokens" className="flex items-center">
            <FaWallet className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span>Tokens & Rewards</span>}
          </Link>
        </li>

        {/* Workspaces Link */}
        <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/workspaces" className="flex items-center">
            <FaClipboardList className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span>Workspaces</span>}
          </Link>
        </li>

        {/* Security Checks Link */}
        <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/securitycheck" className="flex items-center">
            <FaShieldAlt className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span>Security Checks</span>}
          </Link>
        </li>

        {/* Notifications Link */}
        <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/activities" className="flex items-center">
            <FaBell className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span>Activities</span>}
          </Link>
        </li>

        {/* System Management Link */}
        <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/systemlogs" className="flex items-center">
            <FaTasks className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} />
            {!isCollapsed && <span>System Management</span>}
          </Link>
        </li>

        {/* Virtual AI Link with Updated Icon */}
        <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/virtualai" className="flex items-center">
            <FaRobot className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} /> {/* Updated Icon */}
            {!isCollapsed && <span>Virtual AI</span>}
          </Link>
        </li>

        {/* My Account Link */}
        <li className="flex items-center p-4 hover:bg-gray-700">
          <Link to="/myaccount" className="flex items-center">
            <FaUserCircle className={`${isCollapsed ? 'mx-auto' : 'mr-2'}`} /> {/* My Account Icon */}
            {!isCollapsed && <span>My Account</span>}
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;
