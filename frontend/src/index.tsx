import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/base/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { register } from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
register()
reportWebVitals();
