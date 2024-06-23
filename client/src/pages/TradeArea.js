import React from 'react';
import Navbar from '../components/Navbar';
import TradeItem from '../components/TradeItem';

const tradeItems = [
  {
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Black T Shirt1',
    description: 'Barely used black t shirt in good condition with no stains or tears'
  },
  {
    image: 'https://images.pexels.com/photos/428311/pexels-photo-428311.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Navy CA Shirt1',
    description: 'Navy blue ch shirt in good condition with no stains or tears'
  },
  {
    image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'White Bulb T Shirt1',
    description: 'White bulb t shirt in good condition with no stains or tears'
  },
  {
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Black T Shirt2',
    description: 'Barely used black t shirt in good condition with no stains or tears'
  },
  {
    image: 'https://images.pexels.com/photos/428311/pexels-photo-428311.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Navy CA Shirt2',
    description: 'Navy blue ch shirt in good condition with no stains or tears'
  },
  {
    image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'White Bulb T Shirt2',
    description: 'White bulb t shirt in good condition with no stains or tears'
    },
    {
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Black T Shirt3',
    description: 'Barely used black t shirt in good condition with no stains or tears'
  },
  {
    image: 'https://images.pexels.com/photos/428311/pexels-photo-428311.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Navy CA Shirt3',
    description: 'Navy blue ch shirt in good condition with no stains or tears'
  },
  {
    image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'White Bulb T Shirt3',
    description: 'White bulb t shirt in good condition with no stains or tears'
  
  }
];

const TradeArea = () => {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <Navbar />
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Trade Area</h1>
        <div className="flex flex-wrap justify-center">
          {tradeItems.map((item, index) => (
            <TradeItem
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradeArea;
