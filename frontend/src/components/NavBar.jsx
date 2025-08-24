import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(isLogged);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setLoggedIn(false);
    navigate("/Login");
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-200 shadow-md sticky top-0 z-50">
      <header className="text-gray-800 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center transition-all duration-500 ease-in-out">
          {/* Logo */}
          <Link 
            to='/Content' 
            className="flex title-font font-medium items-center text-gray-800 mb-4 md:mb-0 transform hover:scale-105 transition duration-300"
          >
            <img 
              src={logo} 
              alt="logo" 
              className="h-16 w-16 rounded-full border-2 border-gray-300 shadow-md"
            />
            <span className="ml-3 text-2xl font-extrabold tracking-wide hover:text-blue-600 transition duration-300">
              BlogIT
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="md:mr-auto md:ml-8 md:py-1 md:pl-6 md:border-l md:border-gray-300 flex flex-wrap items-center text-lg justify-center space-x-6">
            <Link 
              to='/' 
              className="relative group hover:text-blue-600 transition duration-300"
            >
              Home
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to='/Content' 
              className="relative group hover:text-blue-600 transition duration-300"
            >
              Materials
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Buttons */}
          {loggedIn ? (
            <button
              onClick={handleLogout}
              className="inline-flex items-center bg-red-500 text-white border-0 py-2 px-5 focus:outline-none hover:bg-red-600 rounded-full text-base mt-4 md:mt-0 shadow-md transform hover:scale-105 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to='/Login'>
              <button className="inline-flex items-center bg-white text-blue-600 font-semibold border-0 py-2 px-5 focus:outline-none hover:bg-gray-200 rounded-full text-base mt-4 md:mt-0 shadow-md transform hover:scale-105 transition duration-300">
                AdminLogin
              </button>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
