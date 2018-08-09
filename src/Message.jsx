import React, {Component} from 'react';

function Message(props) {
  console.log("message props", props);
  if (props.message.type === "incomingMessage") {
    return (
      <div className="message">
        <span className="message-username">{props.message.username}: </span>
        <span className="message-content">{props.message.content}</span>
      </div>
    );
  }

  if (props.message.type === "incomingNotification") {
    return (
      <div className="message">
        <span className="message-content">{props.message.content}</span>
      </div>
    );
  }
  return null;
}

export default Message;