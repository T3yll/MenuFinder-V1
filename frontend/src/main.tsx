import ReactDOM from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import '@/App.css';
import Main from '@/common/containers/Main';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProtectedRoute from '@/common/components/layout/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Error from '@/common/containers/Error';
import Home from '@/common/containers/Home';
import InfoRouter from '@/modules/Info/containers/InfoRouter';
import TeamRouter from '@/modules/Team/containers/TeamRouter';
import UserRouter from '@/modules/User/containers/UserRouter';
import FeatureRouter from '@/modules/Feature/containers/FeatureRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <Router>
      <Routes>
        <Route path="/error" element={<Error />} />
        <Route path="/" element={<Main />}>
          {/* Route protégée pour Home */}
          <Route
            index // Cette ligne permet de définir la route par défaut pour "/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* Route protégée pour Info */}
          <Route
            path="/infos/*"
            element={
              <ProtectedRoute>
                <InfoRouter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/*"
            element={
              <ProtectedRoute>
                <UserRouter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams/*"
            element={
              <ProtectedRoute>
                <TeamRouter />
              </ProtectedRoute>
            }
          />
          <Route
            path="/features/*"
            element={
              <ProtectedRoute>
                <FeatureRouter />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </Router>
  </PrimeReactProvider>
);
