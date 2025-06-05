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
import ToastRedux from './components/commom/toast/ToastRedux';
import Profile from './pages/Profile';
import RegisterRestaurant from './pages/RegisterRestaurant';
import RestaurantDetail from './pages/RestaurantDetail';
import Dashboard from './pages/Dashboard';
import AdminMiddleware from './Middleware/adminMiddleware';
import UpdateProfile from './pages/UpdateProfile';

function App() {
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
              <Route path="/map" element={<><NavBar /><Map/></>} />
              <Route path="/register-restaurant" element={<><NavBar /><RegisterRestaurant/></>} />
              <Route path="/restaurants/:id" element={<RestaurantDetail />} />
              <Route path="/admin" element={ <AdminMiddleware><div><NavBar /><Dashboard /></div></AdminMiddleware> } />
            </Routes>
            <ToastRedux />
          </div>
        </Router>
      </CurrencyProvider>
    </Provider>
  );
}

export default App;
