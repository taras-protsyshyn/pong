let playerCounter = 0;

function listen(io) {
  io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    socket.on("ready", () => {
      console.log("Player ready", socket.id);
      playerCounter++;

      if (playerCounter % 2 === 0) {
        io.emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.broadcast.emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.broadcast.emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnect ${reason}`);
    });
  });
}

module.exports = {
  listen,
};
