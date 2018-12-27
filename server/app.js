const express = require("express");
const ws = require("ws");
const Game = require("./game").Game;

const port = 8080;
const app = express();
app.use(express.static("client"));
var server = app.listen(port, () => console.log(`Example HTTP app listening on port ${port}!`));

const game = new Game(console.log);
//TODO(NODE-TURNS) game.playersChanged = function() { $("startButton").disabled = !game.canStart(); };

const wss = new ws.Server({ server });
wss.on("connection", function connection(ws) {
  game.addConnection(ws);
});