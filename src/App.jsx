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

  sendUserToServer = (user) => {
    // user.username = this.state.currentUser;
    user.type = "postNotification";
    this.socket.send(JSON.stringify(user));
  }

  // addMessage = (message) => {
  //   const messages = this.state.messages.concat(message);
  //   this.setState({ messages });
  //   // this.sendMessageToServer(message);
  // }

  sendMessageToServer = (message) => {
    message.username = this.state.currentUser;
    message.type = "postMessage";
    this.socket.send(JSON.stringify(message));
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // console.log(data);
      switch(data.type) {
        case "incomingMessage":
        const messages = this.state.messages.concat(data);
        this.setState({ messages });
        // this.addMessage(data);
          console.log("incomingMessage");
          break;
        case "incomingNotification":
          console.log("incomingNotification");
          break;
        default:
          throw new Error("Unknown event type " + data.type);
      }
    }
  }

  //   const data = JSON.parse(event.data);
  //   switch(data.type) {
  //     case "incomingMessage":
  //       // handle incoming message
  //       break;
  //     case "incomingNotification":
  //       // handle incoming notification
  //       break;
  //     default:
  //       // show an error in the console if the message type is unknown
  //       throw new Error("Unknown event type " + data.type);
  //   }

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

