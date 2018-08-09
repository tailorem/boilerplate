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
      currentUser: "Anon" + this.rando(), /* {name: "notBob"} */
      messages: [],
      // currentUser: {name: "Taylour"},
    };
  }

  rando() {
    return Math.random().toString(10).substr(2, 3);
  }

  changeUser = (username) => {
    console.log('got username: ', username);
    this.setState({ currentUser: username });
  }

  addMessage = (message) => {
    // message.username = this.state.currentUser;
    console.log('message received: ', message);
    const messages = this.state.messages.concat(message);
    this.setState({ messages/*, currentUser: message.username*/ });
    console.log(message);
    // console.log(this.state.currentUser);
    // this.sendMessageToServer(message);
  }

  sendMessageToServer = (message) => {
    message.username = this.state.currentUser;
    console.log('message sending: ', message);
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
        <MessageList messages={ this.state.messages } />
        <ChatBar changeUser={ this.changeUser } addMessage={ this.sendMessageToServer } currentUser={ this.state.currentUser } />
      </div>
    );
  }
}

export default App;

