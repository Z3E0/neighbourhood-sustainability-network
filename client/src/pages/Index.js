import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path according to your directory structure
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const handleGroupChat = () => {
    const group = localStorage.getItem('userGroup');
    if (group) {
      navigate(`/group-chat/${group}`);
    } else {
      navigate('/group-chat'); // Fallback if no group is found
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 pt-20">
      <Navbar />
      <div className="text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to Neighbourhood Sustainability Network</h1>
        <p className="text-lg text-gray-700 mb-8">Your one-stop solution for all your needs.</p>
      </div>
    </div>
  );
};

export default Index;

