const socketIo = require('socket.io');

const configureSocket = (server) => {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinGroup', (group) => {
      socket.join(group);
      console.log(`User joined group ${group}`);
    });

    socket.on('chatMessage', ({ group, message }) => {
      io.to(group).emit('chatMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

module.exports = configureSocket;
