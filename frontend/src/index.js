import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'material-symbols';
import { ClaimContextProvider } from './contexts/ClaimContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClaimContextProvider>
      <App />
    </ClaimContextProvider>
  </React.StrictMode>
);
