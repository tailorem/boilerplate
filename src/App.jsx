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
      currentUser: "Anonymous", /* {name: "notBob"} */
      messages: [],
      // currentUser: {name: "Taylour"},
    };
  }

  rando() {
    return Math.random().toString(36).substr(2, 6);
  }

  addMessage = (message) => {
    // console.log(message.username);
    const messages = this.state.messages.concat(message);
    this.setState({ messages, currentUser: message.username });
    console.log(this.state.currentUser);
  }

  sendMessageToServer = (message) => {
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("Connected to server!");
    }

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // console.log("on message", message);
      // console.log('this', this);
      this.addMessage(message);
    }
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar addMessage={this.sendMessageToServer} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;

