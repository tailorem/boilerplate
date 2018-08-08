import React, {Component} from 'react';

function ChatBar(props) {
  // render() {
  const currentUser = props.currentUser ? props.currentUser : { name: "Anonymous" };
  // console.log("currentUser", currentUser);
    return (
      <footer className="chatbar">
        <form onSubmit={ props.onSubmit }>
          <input name="username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={currentUser.name} />
          <input name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" />
          <button></button>
        </form>
      </footer>
    );
  // }
}

export default ChatBar;

