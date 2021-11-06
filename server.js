const server = require("http").createServer();
const io = require("socket.io")(server);

const PORT = 3000;
const HOSTNAME = "127.0.0.1";

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

let playerCounter = 0;

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("ready", () => {
    console.log("Player ready", socket.id);
    playerCounter++;

    if (playerCounter === 2) {
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });
});
