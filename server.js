const express = require("express");
const mysql = require("mysql");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const routes = require("./app/routes/ignChat.routes");
dotenv.config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});
db.connect(err => {
  if (err) {
    throw err;
  } else {
    console.log("MYSQL CONNECTED");
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", routes);
app.get("/", (req, res) => {
  res.sendfile(_dirname + "/App.js");
});
var server = require("http").Server(app);
var io = require("socket.io").listen(server);
users = [];
connections = [];

io.sockets.on("connection", socket => {
  connections.push(socket);
  console.log("connected %s sockets connected", connections.length);

  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("disconnected %s sockets connected", connections.length);
  });

  socket.on("send_message", data => {
    io.sockets.emit("RECEIVE_MESSAGE", data);
  });
});

server.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});
