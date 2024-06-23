// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 w-full flex justify-between items-center fixed top-0 left-0">
      <div className="text-xl font-bold text-gray-800">
        <Link to="/index">NSN</Link>
      </div>
      <div className="space-x-4">
        <Link to="/group-chat/:group">
          <button className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-300 ease-in-out transform hover:-translate-y-1">
            Group Chat
          </button>
        </Link>
        <Link to="/trade-area">
          <button className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-300 ease-in-out transform hover:-translate-y-1">
            Trade Area
          </button>
        </Link>
        <Link to="/events">
          <button className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black font-semibold py-2 px-4 border border-gray-400 rounded shadow transition duration-300 ease-in-out transform hover:-translate-y-1">
            Events
          </button>
        </Link>
        {/* <Link to="/login">
          <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
