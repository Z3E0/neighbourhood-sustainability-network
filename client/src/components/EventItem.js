import React from 'react';

const EventItem = ({ event }) => {
  return (
    <div className="max-w-full rounded overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{event.title}</div>
        <p className="text-gray-700 text-base">
          {event.description}
        </p>
        <p className="text-gray-500 text-sm mt-2">
          {new Date(event.date).toLocaleDateString()} - {event.location}
        </p>
      </div>
    </div>
  );
};

export default EventItem;
