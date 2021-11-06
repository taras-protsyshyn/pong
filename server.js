const http = require("http");
const io = require("socket.io");

const apiServer = require("./api");
const httpServer = http.createServer(apiServer);
const socketServer = io(httpServer);

const sockets = require("./sockets");

const PORT = 3000;
const HOSTNAME = "127.0.0.1";

httpServer.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

sockets.listen(socketServer);
