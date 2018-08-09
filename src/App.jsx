// jshint ignore: start

import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
// import messages from './messages.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws:localhost:3001");
    this.state = {
      loading: true,
      currentUser: "Anon" + this.rando(),
      messages: [],
    };
  }

  rando = () => {
    return Math.random().toString(10).substr(2, 3);
  }

  // changeUser = (user) => {
  // }

  sendNotificationToServer = (username) => {
    console.log("not.", username);
    const notification = {};
    notification.content = `${this.state.currentUser} changed their name to ${username}`;
    this.setState({ currentUser: username });
    notification.type = "postNotification";
    this.socket.send(JSON.stringify(notification));
  }

  // addMessage = (message) => {
  //   const messages = this.state.messages.concat(message);
  //   this.setState({ messages });
  //   // this.sendMessageToServer(message);
  // }

  sendMessageToServer = (content) => {
    // const content = event.target.value;
    // event.target.value = "";
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

      if (data.type === "incomingMessage" || data.type === "incomingNotification") {
        const messages = this.state.messages.concat(data);
        this.setState({ messages });
      } else {
        throw new Error("Unknown event type " + data.type);
      }
    }
  }

  render() {
    return (
      <div>
        <MessageList messages={ this.state.messages } />
        <ChatBar changeUser={ this.sendNotificationToServer } addMessage={ this.sendMessageToServer } currentUser={ this.state.currentUser } />
      </div>
    );
  }
}

export default App;

