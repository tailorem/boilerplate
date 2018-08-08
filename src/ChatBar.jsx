import React, {Component} from 'react';

function rando() {
  return Math.random().toString(36).substr(2, 6);
}

function ChatBar(props) {
  // console.log(props);

  const onSubmit = (event) => {
    event.preventDefault();

    const inputs = event.target.elements;
    const username = inputs.username.value;
    const content = inputs.content.value;
    // const id = rando();
    const newMessage = { username, content/*, id */};
    // const newUser = { username };

    inputs.content.value = "";
    props.addMessage(newMessage);
    // props.addCurrentUser(newUser);
  };
  // render() {
  // const currentUser = props.currentUser ? props.currentUser : { name: "Anonymous" };
  // console.log("currentUser", currentUser);
    return (
      <footer className="chatbar">
        <form onSubmit={ onSubmit }>
          <input name="username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={props.currentUser} />
          <input name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" />
          <button></button>
        </form>
      </footer>
    );
  // }
}

export default ChatBar;

