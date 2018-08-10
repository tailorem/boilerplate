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

  // TODO: could by DRYer...?
  usernameKeypress = (event) => {
    const value = event.target.value;
    if(event.key == 'Enter'){
      if (value.trim().length < 1 || value === this.props.currentUser) return;
      event.preventDefault();
      this.props.changeUser(value);
      this.focus(event);
    }
  }

  contentKeypress = (event) => {
    const value = event.target.value;
    if(event.key == 'Enter'){
      if (value.trim().length < 1) return;
      event.preventDefault();
      this.props.addMessage(value);
      event.target.value = "";
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <form>
          <input onKeyPress={ this.usernameKeypress } name="username" className="chatbar-username" placeholder="Your Name (Optional)" />
          <input ref={(input) => { this.nameInput = input; }} onKeyPress={ this.contentKeypress } name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </form>
      </footer>
    );
  }
}

export default ChatBar;

