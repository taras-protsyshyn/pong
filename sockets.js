let playerCounter = 0;

function listen(io) {
  const pongNamespace = io.of("/pong");

  pongNamespace.on("connection", (socket) => {
    let room = "";
    console.log("user connected", socket.id);

    socket.on("ready", () => {
      room = `room${Math.floor(playerCounter / 2)}`;
      socket.join(room);
      playerCounter++;

      console.log("Player ready", socket.id, room, playerCounter);

      if (playerCounter % 2 === 0) {
        console.log("startGame");
        pongNamespace.in(room).emit("startGame", socket.id);
      }
    });

    socket.on("paddleMove", (paddleData) => {
      socket.to(room).emit("paddleMove", paddleData);
    });

    socket.on("ballMove", (ballData) => {
      socket.to(room).emit("ballMove", ballData);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Client ${socket.id} disconnect ${reason}`);
      socket.leave(room);
    });
  });
}

module.exports = {
  listen,
};
