// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


const broadcastMessageFromClient = (message) => {
  message.id = uuidv4();
  // console.log("message", message);
  message = JSON.stringify(message);
  wss.clients.forEach(function each(client) {
    client.send(message);
  });
};

const broadcastConnections = (type) => {
  message = {
    type,
    users: wss.clients.size,
    // id: uuidv4(),
  };
  // console.log(message);
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(message));
  });
};

const handlePostMessage = (message) => {
  // console.log("message", message);
  message.type = "incomingMessage";
  broadcastMessageFromClient(message);
};

const handlePostNotification = (message) => {
  // console.log("message", message);
  message.type = "incomingNotification";
  broadcastMessageFromClient(message);
};

// Defines incoming message handler
const handleMessageFromClient = (message) => {
  message = JSON.parse(message);

  if (message.type === "postMessage") {
    handlePostMessage(message);
  } else if (message.type === "postNotification") {
    handlePostNotification(message);
  } else {
    throw new Error("Unknown event type " + message.type);
  }

  // TODO: refactor handler functions
  // if (message.type === "postMessage" && message.type === "postNotification") {
  //   throw new Error("Unknown event type " + message.type);
  // }
  // let protocol = message.type === "postMessage" ? handlePostMessage : handlePostNotification;

};

wss.on('connection', (ws) => {
  console.log('Client connected');
  broadcastConnections("connected");
  // ws.send(JSON.stringify(wss.clients.size));

  ws.on('message', handleMessageFromClient);

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    broadcastConnections("disconnected");
  });
});

