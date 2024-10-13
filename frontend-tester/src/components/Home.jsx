import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaListAlt, FaChartPie } from 'react-icons/fa';
import { FaServer, FaUsers, FaBriefcase, FaCoins } from 'react-icons/fa';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

// Register the necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const Home = ({ isDarkMode }) => {
  const navigate = useNavigate();

  // Sample recent activity data
  const recentActivities = [
    'User Jane Doe signed up.',
    'Token transaction of 100 tokens by John Smith.',
    'Workspace "Design Team" activated.',
    'User feedback received: "Great experience!"',
    'Admin updated system settings.',
    'User Mark requested password reset.',
    'New workspace "Development Team" created.',
    'Token transfer of 200 tokens by Jane Doe.',
    'System security check completed.',
    'User Alex deleted their account.',
  ];

  // Sample categories and details for the app usage section
  const systemAnalysis = [
    'API calls: 5,400',
    'Data uploaded: 2.5GB',
    'Storage used: 12GB',
  ];

  const userAnalysis = [
    'Active users: 400',
    'Offline users: 100',
    'Total users: 1,200',
    'Administrators: 10',
  ];

  const workspaceUsage = [
    'Active sessions: 300',
    'Average session length: 15 minutes',
    'Active tasks: 50',
    'Gym sessions: 10',
    'Study sessions: 20',
  ];

  const transactions = [
    'Successful transactions: 600',
    'Active transactions: 30',
  ];

  const [visibleActivities, setVisibleActivities] = useState(4);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isAppUsageOpen, setIsAppUsageOpen] = useState(false);

  // Sample data for charts
  const userData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Users',
        data: [200, 300, 450, 500, 700, 1200],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

 const tokenRevenueData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      label: 'Tokens Generated',
      data: [1000, 1500, 2000, 2500, 3000, 3500],
      backgroundColor: 'rgba(75, 192, 192, 0.5)', // Changed to green
    },
    {
      label: 'Revenue (in $)',
      data: [100, 200, 250, 300, 400, 500],
      backgroundColor: 'rgba(54, 162, 235, 0.5)', // Blue remains the same
    },
  ],
};


  // Load more recent activities
  const loadMoreActivities = () => {
    setVisibleActivities((prev) => prev + 3); // Load 3 more activities
  };

  // Toggle visibility of recent activity list
  const toggleActivityVisibility = () => {
    setIsActivityOpen((prev) => !prev);
  };

  // Toggle visibility of app usage list
  const toggleAppUsageVisibility = () => {
    setIsAppUsageOpen((prev) => !prev);
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Main Dashboard</h1>

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div
            className="bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-600 text-white p-4 rounded shadow transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate('/users')}
          >
            <h2 className="text-xl">Total Users</h2>
            <p className="text-3xl">1,200</p>
          </div>
          <div
            className="bg-gradient-to-r from-green-500 via-indigo-400 to-teal-500 text-white p-4 rounded shadow transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate('/workspaces')}
          >
            <h2 className="text-xl">Active Workspaces</h2>
            <p className="text-3xl">25</p>
          </div>
          <div
            className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white p-4 rounded shadow transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate('/events')}
          >
            <h2 className="text-xl">Ongoing Events</h2>
            <p className="text-3xl">10</p>
          </div>
          <div
            className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white p-4 rounded shadow transition-transform transform hover:scale-105 cursor-pointer"
            onClick={() => navigate('/tokens')}
          >
            <h2 className="text-xl">Generated Tokens</h2>
            <p className="text-3xl">3,000</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-6">
          <h2
            className={`text-xl font-semibold flex items-center cursor-pointer transition-colors ${
              isActivityOpen ? 'text-green-600' : 'text-white-700'
            }`}
            onClick={toggleActivityVisibility}
          >
            <FaListAlt className="mr-2" />
            Recent Activities
          </h2>

          {/* Show/Hide recent activities based on isActivityOpen */}
          {isActivityOpen && (
            <div className={`shadow rounded mt-2 p-4 transition-all duration-300 ease-in-out transform ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <ul className="ml-4 mt-2">
                {recentActivities.slice(0, visibleActivities).map((activity, index) => (
                  <li key={index} className="py-1">
                    {activity}
                  </li>
                ))}
              </ul>
              {visibleActivities < recentActivities.length && (
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors"
                  onClick={loadMoreActivities}
                >
                  Load More
                </button>
              )}
            </div>
          )}
        </div>

        {/* App Usage Feed with Four Categories */}
        <div className="mt-6">
          <h2
            className={`text-xl font-semibold flex items-center cursor-pointer transition-colors ${
              isAppUsageOpen ? 'text-green-600' : 'text-white-700'
            }`}
            onClick={toggleAppUsageVisibility}
          >
            <FaChartPie className="mr-2" />
            App Usage
          </h2>

          {/* Show/Hide app usage based on isAppUsageOpen */}
          {isAppUsageOpen && (
            <div className={`shadow rounded mt-2 p-4 transition-all duration-300 ease-in-out transform ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Two columns grid */}

                {/* System Analysis Block */}
                <div className={`p-4 rounded-lg shadow hover:shadow-lg transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div
                    className="cursor-pointer flex items-center mb-4"
                    onClick={() => navigate('/systemlogs')}
                  >
                    <FaServer className="text-2xl text-blue-500 mr-2" />
                    <h3 className="text-xl font-bold hover:text-blue-600">System Analysis</h3>
                  </div>
                  <ul className="ml-6 mt-2">
                    {systemAnalysis.map((item, index) => (
                      <li key={index} className="py-1">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Users Analysis Block */}
                <div className={`p-4 rounded-lg shadow hover:shadow-lg transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div
                    className="cursor-pointer flex items-center mb-4"
                    onClick={() => navigate('/users')}
                  >
                    <FaUsers className="text-2xl text-blue-500 mr-2" />
                    <h3 className="text-xl font-bold hover:text-blue-600">Users Analysis</h3>
                  </div>
                  <ul className="ml-6 mt-2">
                    {userAnalysis.map((item, index) => (
                      <li key={index} className="py-1">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Workspace Usage Block */}
                <div className={`p-4 rounded-lg shadow hover:shadow-lg transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div
                    className="cursor-pointer flex items-center mb-4"
                    onClick={() => navigate('/workspaces')}
                  >
                    <FaBriefcase className="text-2xl text-blue-500 mr-2" />
                    <h3 className="text-xl font-bold hover:text-blue-600">Workspace Usage</h3>
                  </div>
                  <ul className="ml-6 mt-2">
                    {workspaceUsage.map((item, index) => (
                      <li key={index} className="py-1">{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Transactions Block */}
                <div className={`p-4 rounded-lg shadow hover:shadow-lg transform transition-transform hover:scale-105 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div
                    className="cursor-pointer flex items-center mb-4"
                    onClick={() => navigate('/tokens')}
                  >
                    <FaCoins className="text-2xl text-blue-500 mr-2" />
                    <h3 className="text-xl font-bold hover:text-blue-600">Transactions</h3>
                  </div>
                  <ul className="ml-6 mt-2">
                    {transactions.map((item, index) => (
                      <li key={index} className="py-1">{item}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Line and Bar Charts */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="shadow rounded p-4 bg-white">
            <h2 className="text-xl font-semibold">User Growth</h2>
            <Line data={userData} />
          </div>
          <div className="shadow rounded p-4 bg-white">
            <h2 className="text-xl font-semibold">Token Revenue</h2>
            <Bar data={tokenRevenueData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
