function log(text) {
  document.getElementById("log").value += text + "\n";
}

var port = 8888;
var isServer = false;

if (http.Server && http.WebSocketServer) {
  isServer = true;
  
  var server = new http.Server();
  var wsServer = new http.WebSocketServer(server);
  server.listen(port);
  
  server.addEventListener('request', function(req) {
    var url = req.headers.url;
    if (url == '/')
      url = '/index.html'; //TODO needed?
    req.serveUrl(url);
    return true;
  });
  
  var connectedSockets = [];

  wsServer.addEventListener('request', function(req) {
    log('Client connected');
    var socket = req.accept();
    connectedSockets.push(socket);

    //TODO better logic
    socket.addEventListener('message', function(e) {
      for (var i = 0; i < connectedSockets.length; i++)
        connectedSockets[i].send(e.data);
    });

    // When a socket is closed, remove it from the list of connected sockets.
    socket.addEventListener('close', function() {
      log("Client disconnected");
      for (var i = 0; i < connectedSockets.length; i++) {
        if (connectedSockets[i] == socket) {
          connectedSockets.splice(i, 1);
          break;
        }
      }
    });
    return true;
  });
}


document.addEventListener('DOMContentLoaded', function() {
  if(isServer) {
    var manageDiv = document.getElementById("manage");
    var startButton = document.createElement("button");
    startButton.innerHTML = "Start";
    startButton.onclick = function() {
      log("Starting!!!")
    }
    manageDiv.appendChild(startButton);
  }
  
  setTimeout(function() { 
  log("Port " + port);
  var address = isServer ? 
    "ws://localhost:" + port + "/" : //TODO works?
    window.location.href.replace("http", "ws");
  var name = document.getElementById("name");
  name.addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {
      var data = {type: "connect", data: name.value};
      ws.send(JSON.stringify(data));
      name.disabled = true;
    }
  });
  
  var input = document.getElementById("input");
  var ws = new WebSocket(address);
  ws.addEventListener("open", function() {
    log("Connected to Server");
  });
  ws.addEventListener('close', function() {
    log('Connection to Server lost');
    input.disabled = true;
  });
  ws.addEventListener('message', function(e) {
    log(e.data);
  });
  input.addEventListener('keydown', function(e) {
    if (ws && ws.readyState == 1 && e.keyCode == 13) {
      var data = {type: "choice", data: input.value};
      ws.send(JSON.stringify(data));
      input.value = '';
    }
  });
}, isServer ? 1000 : 0)}); //Mitigate race condition in starting webServer?
