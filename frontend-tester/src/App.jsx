// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Users from './components/Users';
import Tokens from './components/Tokens';
import VirtualAi from './components/VirtualAi';
import Workspaces from './components/Workspaces';
import Securitycheck from './components/Securitycheck';
import Activities from './components/Activities';
import Systemlogs from './components/Systemlogs'; 
import Home from './components/Home';
import MyAccount from './components/MyAccount';
import Events from './components/Events';
import EventDetails from './components/EventDetails';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State to manage dark mode

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}>
          <Route path="/users" element={<Users />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/virtualai" element={<VirtualAi />} />
          <Route path="/home" element={<Home isDarkMode={isDarkMode} />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/systemlogs" element={<Systemlogs />} />
          <Route path="/securitycheck" element={<Securitycheck />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
