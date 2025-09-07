const { Server } = require('socket.io');

module.exports = function(server) {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', socket => {
    socket.on('join', ({ room }) => {
      socket.join(room);
    });

    socket.on('leave', ({ room }) => {
      socket.leave(room);
    });

    socket.on('message', (data) => {
      io.to(data.room).emit('message', data);
    });

    socket.on('typing', (data) => {
      socket.to(data.room).emit('typing', data);
    });

    socket.on('disconnect', () => {});
  });
};
