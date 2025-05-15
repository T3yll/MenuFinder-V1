import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/components/App.scss';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurants';
import Menus from './pages/Menus';
import NavBar from "./components/NavBar";
import Map from './pages/Map';
import { CurrencyProvider } from './contexts/CurrencyContext';
import Profile from './pages/Profile';

function App() {
  return (
    <CurrencyProvider>
      <Router>
        <div className="min-h-screen bg-light text-dark">
          <Routes>
            <Route path="/" element={<><NavBar /><Home /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurants" element={<><NavBar /><Restaurants /></>} />
            <Route path="/menus" element={<><NavBar /><Menus /></>} />
            <Route path="/profile" element={<><NavBar /><Profile /></>} />
            <Route path="/map" element={<><NavBar /><Map/></>} />
          </Routes>
        </div>
      </Router>
    </CurrencyProvider>
  );
}

export default App;
