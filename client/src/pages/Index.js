import React from 'react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Neighbourhood Sustainability Network</h1>
      <p className="text-lg text-gray-700 mb-8">Your one-stop solution for all your needs.</p>
      <div className="space-x-4">
        <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        <a href="/register" className="text-indigo-600 hover:underline">Register</a>
      </div>
    </div>
  );
};

export default Index;
