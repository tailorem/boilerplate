// jshint ignore: start

import React, {Component} from 'react';

function rando() {
  return Math.random().toString(36).substr(2, 6);
}

class ChatBar extends Component {

  focus = (event) => {
    event.preventDefault();
    this.nameInput.focus();
  }

  usernameKeypress = (event) => {
    if(event.key == 'Enter'){
      event.preventDefault();
      const username = event.target.value;
      const newUser = { username };

      // event.target.value = "";
      this.props.changeUser(newUser);
      this.focus(event);
    }
  }

  contentKeypress = (event) => {
    if(event.key == 'Enter'){
      event.preventDefault();
      const content = event.target.value;
      const newMessage = { content };
      console.log(newMessage);

      event.target.value = "";
      this.props.addMessage(newMessage);
      // this.props.addCurrentUser(newUser);
    }
  }

  render() {
  // console.log('this.props', this.props);
  // const currentUser = this.props.currentUser ? this.props.currentUser : { name: "Anonymous" };
  // console.log("currentUser", currentUser);
    return (
      <footer className="chatbar">
        <form>
          <input onKeyPress={ this.usernameKeypress } name="username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
          <input ref={(input) => { this.nameInput = input; }} onKeyPress={ this.contentKeypress } name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </form>
      </footer>
    );
  }
}

export default ChatBar;

