// jshint ignore: start

import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import messages from './messages.jsx';


class App extends Component {
  constructor(props) {
    super(props);
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

  onSubmit = (event) => {
    // console.log(this);
    event.preventDefault();
    const inputs = event.target.elements;
    const username = inputs.username.value;
    const content = inputs.content.value;
    const id = this.rando();
    const newMessage = { username, content, id }
    const messages = this.state.messages.concat(newMessage);

    inputs.content.value = "";
    this.setState({ messages });
  }

  componentDidMount() {
    this.socket = new WebSocket("ws:localhost:3001", "protocolOne");
    this.socket.onopen = (event) => {
      console.log("Connected to server!");
    }

// exampleSocket.onopen = function (event) {
//   exampleSocket.send("Here's some text that the server is urgently awaiting!");
// };
//     send("Connected to server...?");
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar onSubmit={this.onSubmit} currentUser={this.state.currentUser} />
      </div>
    );
  }
}

export default App;

