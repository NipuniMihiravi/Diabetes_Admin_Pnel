import React, { useState, useEffect } from 'react';
import { NavLink, BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import './components/Admin/App.css';

import Article from './components/Admin/Article';
import LoginForm from './components/Admin/LoginForm';
import QueryList from './components/Admin/QueryList';

import PredictForm from './components/AI/PredictForm';




const App = () => {
  //const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

useEffect(() => {
  const handleScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) { // Check if navbar exists before accessing it
      if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    } else {
      console.warn('Navbar element is not found.');
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup event listener on unmount
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };


  return (
    <div>
      {/* Conditionally render the navbar based on the current route */}
            {location.pathname !== '/adminlogin' && (
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <Link to="/cover">
              <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" className="logo" />
            </Link>
          </div>

          <div className="right-corner-icons">

            <div className="login-container">
              <Link to="/adminlogin">
                <button className="login-button">
                  <img src={`${process.env.PUBLIC_URL}/images/login.jpg`} alt="Logout" className="icon" />
                  Logout
                </button>
              </Link>
            </div>
          </div>
        </div>


        <div className={`nav-links-container ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">

            <li><NavLink to="/article" className={({ isActive }) => (isActive ? 'active' : '')}>ARTICLE CREATE</NavLink></li>
            <li><NavLink to="/query" className={({ isActive }) => (isActive ? 'active' : '')}>RESPOND OF QUERY</NavLink></li>


          </ul>
        </div>
      </nav>
      )}



      <main className="container mt-4">

        <Routes>

          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/article" element={<Article />} />
          <Route path="/adminlogin" element={<LoginForm />} />
          <Route path="/query" element={<QueryList />} />
          <Route path="/predict" element={<PredictForm />} />



        </Routes>
      </main>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
