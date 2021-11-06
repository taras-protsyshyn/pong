const server = require("http").createServer();
const io = require("socket.io")(server);

const PORT = 3000;
const HOSTNAME = "127.0.0.1";

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

io.on("connection", (client) => {
  console.log("user connected", client);
});
