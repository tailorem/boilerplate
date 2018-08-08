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
      currentUser: false,
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
    // console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 402, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages });
    }, 3000);
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

