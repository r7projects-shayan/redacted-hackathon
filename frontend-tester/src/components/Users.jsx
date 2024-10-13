import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { FaChartLine, FaLayerGroup, FaUserPlus, FaTrashAlt, FaUserShield, FaBan, FaUserCog, FaEye, FaKey } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

const Users = () => {
  const navigate = useNavigate();

  const [showGraph, setShowGraph] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState({ action: '', visible: false });

  // Dummy data for user levels
  const levelsData = Array.from({ length: 100 }, (_, index) => ({
    level: index + 1,
    totalUsers: Math.floor(Math.random() * 1000),
    activeUsers: Math.floor(Math.random() * 500),
    tokens: Math.floor(Math.random() * 10000),
  }));

  // Dummy data for graphical analysis (Users)
  const graphData = {
    labels: Array.from({ length: 100 }, (_, index) => `Level ${index + 1}`),
    datasets: [
      {
        label: 'Number of Users',
        data: levelsData.map((level) => level.totalUsers),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Dummy data for graphical analysis (Tokens)
  const tokensData = {
    labels: Array.from({ length: 100 }, (_, index) => `Level ${index + 1}`),
    datasets: [
      {
        label: 'Tokens per Level',
        data: levelsData.map((level) => level.tokens),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      zoom: {
        zoom: {
          enabled: true,
          mode: 'x',
          speed: 0.1,
        },
        pan: {
          enabled: true,
          mode: 'x',
          speed: 0.1,
        },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleAction = (action) => {
    setShowModal({ action, visible: true });
  };

  const closeModal = () => {
    setShowModal({ action: '', visible: false });
  };

  const handleSubmit = () => {
    alert(`${showModal.action} action performed!`);
    closeModal();
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">User Management Dashboard</h1>

      {/* Overview block */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-indigo-600 text-white p-6 rounded shadow hover:scale-105 transform transition-all cursor-pointer">
          <h2 className="text-xl">Total Users</h2>
          <p className="text-3xl">1,200</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 via-indigo-400 to-teal-500 text-white p-6 rounded shadow hover:scale-105 transform transition-all cursor-pointer">
          <h2 className="text-xl">Active Users</h2>
          <p className="text-3xl">400</p>
        </div>
        <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 text-white p-6 rounded shadow hover:scale-105 transform transition-all cursor-pointer">
          <h2 className="text-xl">Token Transactions</h2>
          <p className="text-3xl">50,000</p>
        </div>
      </div>


      {/* Levels Section */}
      <div className="mt-6">
        <div
          className="flex items-center space-x-2 text-2xl font-semibold cursor-pointer hover:text-green-500 transition-all"
          onClick={() => setShowLevels(!showLevels)}
        >
          <FaLayerGroup />
          <h2>Levels</h2>
        </div>
        {showLevels && (
          <div className="bg-dark shadow rounded p-4 mt-4 max-h-96 overflow-y-auto transition-all duration-500">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {levelsData.map((level) => (
                <div
                  key={level.level}
                  className="bg-gradient-to-r from-green-400 via-blue-600 to-blue-300 p-4 rounded-lg shadow hover:shadow-lg hover:bg-gradient-to-br transition-transform hover:scale-105 cursor-pointer"
                  onClick={() => navigate(`/levels/${level.level}`)}
                >
                  <h3 className="text-xl font-bold">Level {level.level}</h3>
                  <p>Total Users: {level.totalUsers}</p>
                  <p>Active Users: {level.activeUsers}</p>
                  <p>Tokens: {level.tokens}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
       
      <div className="mt-6">
  <div
    className="flex items-center space-x-2 text-2xl font-semibold cursor-pointer hover:text-red-500 transition-all"
    onClick={() => setShowActions(!showActions)}
  >
    <FaUserCog />
    <h2>Take Actions on Users</h2>
  </div>
  {showActions && (
    <div className="bg-dark shadow rounded p-4 mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300 cursor-pointer hover:bg-green-400"
        onClick={() => navigate('/add-user')}
      >
        <FaUserPlus className="inline-block mr-2" /> Add User
      </button>
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300 cursor-pointer hover:bg-green-400"
        onClick={() => navigate('/remove-user')}
      >
        <FaTrashAlt className="inline-block mr-2" /> Remove User
      </button>
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300 cursor-pointer hover:bg-green-400"
        onClick={() => navigate('/deactivate-user')}
      >
        <FaBan className="inline-block mr-2" /> Deactivate User
      </button>
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300 cursor-pointer hover:bg-green-400"
        onClick={() => navigate('/change-role')}
      >
        <FaUserShield className="inline-block mr-2" /> Change Role
      </button>
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300 cursor-pointer hover:bg-green-400"
        onClick={() => handleAction('Check Permissions')}
      >
        <FaKey className="inline-block mr-2" /> Check Permissions
      </button>
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300 cursor-pointer hover:bg-green-400"
        onClick={() => handleAction('View Profile')}
      >
        <FaEye className="inline-block mr-2" /> View Profile
      </button>
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300 cursor-pointer hover:bg-green-400"
        onClick={() => handleAction('Send Notification')}
      >
        <FaUserCog className="inline-block mr-2" /> Send Notification
      </button>
      <button
        className="bg-gray-800 text-white font-bold py-2 px-4 rounded shadow transition-all duration-300 cursor-pointer hover:bg-green-400"
        onClick={() => handleAction('Reset Password')}
      >
        <FaKey className="inline-block mr-2" /> Reset Password
      </button>
    </div>
  )}
</div>

{/* Graphical Analysis */}
<div className="mt-6">
        <div
          className="flex items-center space-x-2 text-2xl font-semibold cursor-pointer hover:text-blue-500 transition-all"
          onClick={() => setShowGraph(!showGraph)}
        >
          <FaChartLine />
          <h2>User Levels Analysis</h2>
        </div>
        {showGraph && (
          <div className="bg-white shadow p-4 rounded mt-4 transition-all duration-500 grid grid-cols-1  gap-4">
            <div className="h-96">
              <Line data={graphData} options={chartOptions} />
            </div>
            <div className="h-96">
              <Line data={tokensData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>
      {/* Modal for actions */}
      {showModal.visible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{showModal.action}</h3>
            <p>Are you sure you want to {showModal.action.toLowerCase()}?</p>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={closeModal}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;







