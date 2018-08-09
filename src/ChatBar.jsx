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
      this.props.changeUser(event.target.value);
      this.focus(event);
    }
  }

  contentKeypress = (event) => {
    if(event.key == 'Enter'){
      event.preventDefault();
      this.props.addMessage(event.target.value);
      event.target.value = "";
    }
  }

  render() {
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

