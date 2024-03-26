import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { theme } from './configs/MUI_Theme';
import { AuthProvider } from './context/AuthProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ShoppingProvider } from './context/ShoppingProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <ShoppingProvider>
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Router>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ShoppingProvider>
  </AuthProvider>
  // </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
