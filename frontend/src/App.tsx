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
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useEffect, useState } from 'react';
import ToastRedux from './components/commom/toast/ToastRedux';
import Profile from './pages/Profile';
import RegisterRestaurant from './pages/RegisterRestaurant';
import RestaurantDetail from './pages/RestaurantDetail';
import EditRestaurant from './pages/EditRestaurant';
import RestaurantMenus from './pages/RestaurantMenus';
import MenuItems from './pages/MenuItems';
import Dashboard from './pages/Dashboard';
import DashboardRestaurant from './pages/DashboardRestaurant';
import AdminMiddleware from './Middleware/AdminMiddleware';
import Loading from './components/Loading';
import UpdateProfile from './pages/UpdateProfile';

function App() {
   const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])
    if (loading) {
        return <Loading/>
    }
  return (
    <Provider store={store}>
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
              <Route path="/updateProfile" element={<><NavBar /><UpdateProfile /></>} />
              {/* <Route path="/updateProfile" element={<><NavBar /><UpdateProfile/></>} /> */}
              <Route path="/map" element={<><NavBar /><Map/></>} />
              <Route path="/register-restaurant" element={<><NavBar /><RegisterRestaurant/></>} />
              <Route path="/restaurants/:id" element={<><NavBar /><RestaurantDetail /></>} />
              <Route path="/admin" element={ <AdminMiddleware><><NavBar /><Dashboard /></></AdminMiddleware> } />
              <Route path="/dashboard" element={<><NavBar /><DashboardRestaurant /></>} />
            <Route path="/edit-restaurant/:id" element={<><NavBar /><EditRestaurant /></>} />
            <Route path="/restaurant-menus/:id" element={<><NavBar /><RestaurantMenus /></>} />
            <Route path="/menu-items/:id" element={<><NavBar /><MenuItems /></>} />
          </Routes>
            <ToastRedux />
          </div>
        </Router>
      </CurrencyProvider>
    </Provider>
  );
}

export default App;
