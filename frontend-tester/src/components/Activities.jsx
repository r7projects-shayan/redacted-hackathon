import React, { useState } from 'react';
import { FaUser, FaCoins, FaExclamationTriangle } from 'react-icons/fa';

// Placeholder for future API calls
const fetchMockData = (type) => {
  const date = new Date().toLocaleString(); // Get current date and time
  switch (type) {
    case 'adminActions':
      return [
        { action: 'Admin John updated system settings.', date },
        { action: 'Admin Jane deleted a workspace.', date },
        { action: 'Admin Mark added a new administrator.', date }
      ];
    case 'userActions':
      return [
        { action: 'User Alex signed up.', date },
        { action: 'User Sam reset password.', date },
        { action: 'User Jane joined "Dev Team" workspace.', date }
      ];
    case 'transactions':
      return [
        { action: 'Transaction ID #123456: 500 tokens by User Sam.', date },
        { action: 'Transaction ID #654321: 200 tokens by User Jane.', date }
      ];
    case 'alerts':
      return [
        { action: 'Insecure login attempt detected.', date },
        { action: 'Unauthorized access blocked.', date },
        { action: 'Suspicious activity on router detected.', date }
      ];
    default:
      return [];
  }
};

const Activities = () => {
  const [openSections, setOpenSections] = useState({
    adminActions: false,
    userActions: false,
    transactions: false,
    alerts: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle the specific section
    }));
  };

  const adminActions = fetchMockData('adminActions');
  const userActions = fetchMockData('userActions');
  const transactions = fetchMockData('transactions');
  const alerts = fetchMockData('alerts');

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Recent Activities</h1>

      {/* Section: Recent Administrator Actions */}
      
      <div className="mb-4">
        <h2
          className={`text-xl font-semibold flex items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:text-blue-500`}
          onClick={() => toggleSection('adminActions')}
        >
          <FaUser className="mr-2 text-blue-500" />
          Recent Administrator Actions
        </h2>
        <div
          className={`transition-all duration-500 ease-in-out opacity-0 ${
            openSections.adminActions ? 'opacity-100 max-h-screen' : 'max-h-0'
          } overflow-hidden`}
        >
          <ul className="list-disc pl-8 mt-2 fade-in">
            {adminActions.map((item, index) => (
              <li key={index} className="py-1">
                {item.action} <span className="text-sm text-gray-500">({item.date})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section: Recent User Actions */}
      <div className="mb-4">
        <h2
          className={`text-xl font-semibold flex items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:text-green-500`}
          onClick={() => toggleSection('userActions')}
        >
          <FaUser className="mr-2 text-green-500" />
          Recent User Actions
        </h2>
        <div
          className={`transition-all duration-500 ease-in-out opacity-0 ${
            openSections.userActions ? 'opacity-100 max-h-screen' : 'max-h-0'
          } overflow-hidden`}
        >
          <ul className="list-disc pl-8 mt-2">
            {userActions.map((item, index) => (
              <li key={index} className="py-1">
                {item.action} <span className="text-sm text-gray-500">({item.date})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section: Recent Transactions */}
      <div className="mb-4">
        <h2
          className={`text-xl font-semibold flex items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:text-yellow-500`}
          onClick={() => toggleSection('transactions')}
        >
          <FaCoins className="mr-2 text-yellow-500" />
          Recent Transactions
        </h2>
        <div
          className={`transition-all duration-500 ease-in-out opacity-0 ${
            openSections.transactions ? 'opacity-100 max-h-screen' : 'max-h-0'
          } overflow-hidden`}
        >
          <ul className="list-disc pl-8 mt-2">
            {transactions.map((item, index) => (
              <li key={index} className="py-1">
                {item.action} <span className="text-sm text-gray-500">({item.date})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Section: Alerts & Insecure Actions */}
      <div className="mb-4">
        <h2
          className={`text-xl font-semibold flex items-center cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:text-red-500`}
          onClick={() => toggleSection('alerts')}
        >
          <FaExclamationTriangle className="mr-2 text-red-500" />
          Alerts & Insecure Actions
        </h2>
        <div
          className={`transition-all duration-500 ease-in-out opacity-0 ${
            openSections.alerts ? 'opacity-100 max-h-screen' : 'max-h-0'
          } overflow-hidden`}
        >
          <ul className="list-disc pl-8 mt-2">
            {alerts.map((item, index) => (
              <li key={index} className="py-1">
                {item.action} <span className="text-sm text-gray-500">({item.date})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Activities;
