const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Sets the port to 3001
const PORT = 3001;

// Creates a new express server
const server = express()
  // Makes the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Creates the WebSockets server
const wss = new SocketServer({ server });


// Called on 'connection' and on 'close'
const broadcastConnections = (type) => {
  message = { type, users: wss.clients.size };
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(message));
  });
};

// Broadcasts messages to all clients
const broadcastMessageFromClient = (message) => {
  message.id = uuidv4();
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(message));
  });
};

// Called if message type === "postMessage"
const handlePostMessage = (message) => {
  message.type = "incomingMessage";
  broadcastMessageFromClient(message);
};

// Called if message type === "postNotification" or "connectedUser"
const handlePostNotification = (message) => {
  message.type = (message.type === "postNotification") ? "incomingNotification" : "connectedUser";
  broadcastMessageFromClient(message);
};

// Called on 'message'
const handleMessageFromClient = (message) => {
  message = JSON.parse(message);

  if (message.type === "postMessage") {
    handlePostMessage(message);
  } else if (message.type === "postNotification" || message.type === "connectedUser") {
    handlePostNotification(message);
  } else {
    throw new Error("Unknown event type " + message.type);
  }
};

// Assigns color to user on connection
const assignColor = (ws) => {
  const colors = ["#399bb6", "#555", "#d4004b", "#6dc066"];
  const color = `${colors[Math.floor(Math.random() * colors.length)]}`;
  ws.send(JSON.stringify({ color }));
};

// TODO: DRY up handler functions
// TODO: const user = wss.clients.filter(client => client.id === userId );

wss.on('connection', (ws) => {
  console.log('Client connected');
  assignColor(ws);
  broadcastConnections("connected");

  ws.on('message', handleMessageFromClient);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    broadcastConnections("disconnected");
    broadcastMessageFromClient({ type: "incomingNotification", content: "A user has disconnected." });
  });
});

