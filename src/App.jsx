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

  rando() {
    return Math.random().toString(10).substr(2, 3);
  }

  changeUser = (user) => {
    this.setState({ currentUser: user.username });
  }

  addMessage = (message) => {
    const messages = this.state.messages.concat(message);
    this.setState({ messages/*, currentUser: message.username*/ });
    // this.sendMessageToServer(message);
  }

  sendMessageToServer = (message) => {
    message.username = this.state.currentUser;
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
    }

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
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

