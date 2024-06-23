// client/src/components/Options.js
import React from 'react';
import { Link } from 'react-router-dom';

const Options = () => {
  return (
    <div className="flex space-x-8 mt-8">
      <Link to="/group-chat/:group">
        <div className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black font-semibold py-6 px-12 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
          Group Chat
        </div>
      </Link>
      <Link to="/trade-area">
        <div className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black font-semibold py-6 px-12 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
          Trade Area
        </div>
      </Link>
      <Link to="/events">
        <div className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black font-semibold py-6 px-12 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer">
          Events
        </div>
      </Link>
    </div>
  );
};

export default Options;
