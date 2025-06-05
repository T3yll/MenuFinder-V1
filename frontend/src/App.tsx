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
import RegisterRestaurant from './pages/RegisterRestaurant';
import RestaurantDetail from './pages/RestaurantDetail';
import EditRestaurant from './pages/EditRestaurant';
import RestaurantMenus from './pages/RestaurantMenus';
import MenuItems from './pages/MenuItems';
import DashboardRestaurant from './pages/Dashboard';

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
            <Route path="/register-restaurant" element={<><NavBar /><RegisterRestaurant/></>} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/dashboard" element={<><NavBar /><DashboardRestaurant /></>} />
            <Route path="/edit-restaurant/:id" element={<EditRestaurant />} />
            <Route path="/restaurant-menus/:id" element={<RestaurantMenus />} />
            <Route path="/menu-items/:id" element={<MenuItems />} />
          </Routes>
        </div>
      </Router>
    </CurrencyProvider>
  );
}

export default App;
