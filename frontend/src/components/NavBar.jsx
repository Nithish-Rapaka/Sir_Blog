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
    <div className="bg-white shadow-md fixed w-full top-0 left-0">
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link to='/Content' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={logo} alt="logo" className="h-20 w-15 rounded-full"/>
        </Link>
        <span className="ml-3 text-xl font-bold">BlogIT</span>

        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
          <Link to='/' className="mr-5 hover:text-gray-900">Home</Link>
          <Link to='/Content' className="mr-5 hover:text-gray-900">Materials</Link>
        </nav>

        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="inline-flex items-center bg-red-500 text-white border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-base mt-4 md:mt-0"
          >
            Logout
          </button>
        ) : (
          <Link to='/Login'>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
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
