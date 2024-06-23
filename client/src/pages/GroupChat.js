import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Navbar from '../components/Navbar';
import 'tailwindcss/tailwind.css';

const socket = io('http://localhost:3000');

const GroupChat = () => {
  const { group } = useParams();
  const decodedGroup = group ? decodeURIComponent(group) : 'Default Group';

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username'); // Assuming you store the username in localStorage during login/register

  useEffect(() => {
    socket.emit('joinGroup', decodedGroup);

    socket.on('loadMessages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    socket.on('chatMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chatMessage');
      socket.off('loadMessages');
    };
  }, [decodedGroup]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('chatMessage', { group: decodedGroup, message, user_id: userId, username });
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 pt-20">
      <Navbar />
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold mt-4">Group Chat for {decodedGroup}</h1>
        <div className="w-full max-w-2xl p-4 mt-6 bg-white rounded-lg shadow-md">
          <div className="h-96 overflow-y-auto mb-4 p-2 border border-gray-200 rounded">
            {messages.map((msg, index) => (
              <div key={index} className="p-2 my-1 bg-gray-100 rounded">
                <strong>{msg.username}:</strong> {msg.message}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChat;
