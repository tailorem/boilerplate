import React, {Component} from 'react';

function rando() {
  return Math.random().toString(36).substr(2, 6);
}

function ChatBar(props) {
  console.log('props', props);

  const usernameKeypress = (event) => {
    if(event.key == 'Enter'){
      event.preventDefault();
      const username = event.target.value;

      // event.target.value = "";
      props.changeUser(username);
    }
  };

  const contentKeypress = (event) => {
    if(event.key == 'Enter'){
      event.preventDefault();
      const content = event.target.value;
      const newMessage = { content };
      console.log(newMessage);

      event.target.value = "";
      props.addMessage(newMessage);
      // props.addCurrentUser(newUser);
    }
  };
  // render() {
  // const currentUser = props.currentUser ? props.currentUser : { name: "Anonymous" };
  // console.log("currentUser", currentUser);
    return (
      <footer className="chatbar">
        <form onSubmit={(event) => event.preventDefault()}>
          <input onKeyPress={ usernameKeypress } name="username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.currentUser} />
          <input onKeyPress={ contentKeypress } name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" />
          <button></button>
        </form>
      </footer>
    );
  // }
}

export default ChatBar;

