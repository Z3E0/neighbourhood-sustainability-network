import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">
        <Link to="/">MyApp</Link>
      </div>
      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
