// jshint ignore: start

import React, {Component} from 'react';

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
      messages: [],
    };
  }

  rando = () => {
    return Math.random().toString(10).substr(2, 3);
  }

  sendNotificationToServer = (username) => {
    console.log("not.", username);
    const notification = {};
    notification.content = `${this.state.currentUser} changed their name to ${username}`;
    this.setState({ currentUser: username });
    notification.type = "postNotification";
    this.socket.send(JSON.stringify(notification));
  }

  sendMessageToServer = (content) => {
    const message = { content };
    console.log(message);
    message.username = this.state.currentUser;
    message.type = "postMessage";
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("Connected to server!");
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("incoming data", data);

      if (data.type === "incomingMessage" || data.type === "incomingNotification") {
        const messages = this.state.messages.concat(data);
        this.setState({ messages });
      } else if (data.type === "connected" || data.type === "disconnected") {
        this.setState({ userCount: data.users });
        // const current = this.state.currentUser;
        // console.log("which user", current);
      } else {
        throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
    return (
      <div>
        <NavBar userCount={this.state.userCount} />
        <MessageList messages={ this.state.messages } />
        <ChatBar changeUser={ this.sendNotificationToServer } addMessage={ this.sendMessageToServer } currentUser={ this.state.currentUser } />
      </div>
    );
  }
}

export default App;

