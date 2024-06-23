import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import EventItem from '../components/EventItem';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Tooltip } from 'react-tooltip';

const events = [
  {
    title: 'Community Cleanup',
    description: 'Join us for a community cleanup event.',
    date: '2024-07-15',
    location: 'Bishan Park',
  },
  {
    title: 'Recycling Workshop',
    description: 'Learn how to recycle effectively.',
    date: '2024-07-20',
    location: 'Bishan Community Center',
  },
  {
    title: 'Sustainability Fair',
    description: 'Explore various sustainability initiatives.',
    date: '2024-08-05',
    location: 'City Hall',
  },
  {
    title: 'Tree Planting Day',
    description: 'Help us plant trees in the community park.',
    date: '2024-07-25',
    location: 'Jurong West Park',
  },
  {
    title: 'Eco-Friendly Cooking Class',
    description: 'Learn how to cook eco-friendly meals.',
    date: '2024-08-10',
    location: 'Harbourfront',
  },
  {
    title: 'Green Energy Talk',
    description: 'Attend a talk on green energy solutions.',
    date: '2024-08-15',
    location: 'City Hall',
  },
  {
    title: 'Sustainable Living Workshop',
    description: 'A workshop on sustainable living practices.',
    date: '2024-08-20',
    location: 'Ang Mo Kio Community Center',
  },
  {
    title: 'Water Conservation Seminar',
    description: 'Learn about water conservation techniques.',
    date: '2024-09-05',
    location: 'Raffles Place',
  },
];

const Events = () => {
  const [date, setDate] = useState(new Date());

  const handleDateHover = (date) => {
    const event = events.find(e => new Date(e.date).toDateString() === date.toDateString());
    return event ? `${event.title} - ${event.location}` : null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 pt-20 flex">
        <div className="w-2/3">
          <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
          {events.map((event, index) => (
            <EventItem key={index} event={event} />
          ))}
        </div>
        <div className="w-1/3 ml-8">
          <h2 className="text-2xl font-bold mb-4">Event Calendar</h2>
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={({ date, view }) => {
              if (view === 'month') {
                const event = events.find(e => new Date(e.date).toDateString() === date.toDateString());
                if (event) {
                  return (
                    <div data-tip={handleDateHover(date)}>
                      <div className="bg-blue-500 w-2 h-2 rounded-full mx-auto mt-1"></div>
                      <Tooltip place="top" effect="solid">
                        <span>{event.title} - {event.location}</span>
                      </Tooltip>
                    </div>
                  );
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Events;
