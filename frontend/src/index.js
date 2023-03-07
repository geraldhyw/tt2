import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'material-symbols';
import { ClaimContextProvider } from './contexts/ClaimContext';
import { AuthContextProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ClaimContextProvider>
        <App />
      </ClaimContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
