import React, {Component} from 'react';


function rando() {
  return Math.random().toString(36).substr(2, 6);
}

const ChatBar = (props) => {
  // console.log(this.props);

  const onSubmit = (event) => {
    const inputs = event.target.elements;
    const username = inputs.username.value;
    const content = inputs.content.value;
    const id = rando();
    const newMessage = { username, content, id };

    // console.log("this", this);
    // console.log(event.target.elements);
    event.preventDefault();
    props.addMessage;
    // inputs.content.value = "";
  };

  // render() {
  const currentUser = props.currentUser ? props.currentUser : { name: "Anonymous" };
  // console.log("currentUser", currentUser);
    return (
      <footer className="chatbar">
        <form onSubmit={ event => onSubmit(event) }>
          <input name="username" className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={currentUser.name} />
          <input name="content" className="chatbar-message" placeholder="Type a message and hit ENTER" />
          <button></button>
        </form>
      </footer>
    );
  // }
}

export default ChatBar;

