import React from 'react';
import { createRoot } from 'react-dom/client'; // Importez createRoot
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Importez AuthProvider

// Sélectionnez l'élément racine de votre application
const container = document.getElementById('root');

// Créez une racine React
const root = createRoot(container);

// Rendez votre application
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);