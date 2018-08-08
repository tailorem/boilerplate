// jshint ignore: start

import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import messages from './messages.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws:localhost:3001", "protocolOne");
    this.state = {
      loading: true,
      currentUser: false, /* {name: "notBob"} */
      messages,
      // currentUser: {name: "Taylour"},
    };
  }

  rando() {
    return Math.random().toString(36).substr(2, 6);
  }

  // addMessage = (message) => {
  //   const messages = this.state.messages.concat(message);
  //   this.setState({ messages });
  // }

  sendMessageToServer = (message) => {
    // console.log(message);
    // console.log(JSON.stringify(message));
    // datatype?
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("Connected to server!");
      // this.socket.send("Hi, server!");
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

