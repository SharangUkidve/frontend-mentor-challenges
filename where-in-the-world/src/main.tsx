import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import Header from './components/Header/Header.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Header />
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
);
