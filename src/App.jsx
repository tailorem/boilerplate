// jshint ignore: start

import React, { Component } from 'react';

import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws:localhost:3001");
    this.state = {
      loading: true,
      userCount: 0,
      currentUser: "Anon" + this.rando(),
      userColor: "#555",
      messages: [],
    };
  }

  rando = () => {
    return Math.random().toString(10).substr(2, 3);
  }

  // Called when user 'submits' new username
  sendNotificationToServer = (username) => {
    const notification = {};
    notification.content = `${this.state.currentUser} changed their name to ${username}`;
    this.setState({ currentUser: username });
    notification.type = "postNotification";
    this.socket.send(JSON.stringify(notification));
  }

  // Called when user 'submits' message
  sendMessageToServer = (content) => {
    const message = { content };
    message.username = this.state.currentUser;
    message.type = "postMessage";
    message.userColor = this.state.userColor;
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("Connected to server!");
      this.socket.send(JSON.stringify({ type: "connectedUser", name: this.state.currentUser }));
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "incomingMessage" || data.type === "incomingNotification" || (data.type === "connectedUser" && data.name !== this.state.currentUser)) {
        const messages = this.state.messages.concat(data);
        this.setState({ messages });
      } else if (data.type === "connectedUser") {
        console.log("This user has connected."); // TODO: Display welcome message to connected user
      } else if (data.type === "connected" || data.type === "disconnected") {
        this.setState({ userCount: data.users });
      } else if (data.color) {
        this.setState({ userColor: data.color });
      } else {
        throw new Error("Unknown event type " + data.type);
      }
    }
    // TODO: "which" user has disconnected?
  }

  render() {
    return (
      <div>
        <NavBar userCount = { this.state.userCount } />
        <MessageList messages = { this.state.messages } />
        <ChatBar changeUser = { this.sendNotificationToServer } addMessage = { this.sendMessageToServer } currentUser = { this.state.currentUser } />
      </div> );
  }
}

export default App;

