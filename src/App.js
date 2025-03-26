import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Box } from '@mui/material';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Rooms from './pages/Rooms';
import Classes from './pages/Classes';

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/classes" element={<Classes />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
};

export default App;