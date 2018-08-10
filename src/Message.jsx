import React, {Component} from 'react';

function Message(props) {
  const color = props.message.userColor;
  console.log("COLOR", color);
  if (props.message.type === "incomingMessage") {
    return (
      <div className="message">
        <span className="message-username" style={{ color: color }}>{props.message.username}: </span>
        <span className="message-content">{props.message.content}</span>
      </div>
    );
  }

  // DRY THIS UP
  if (props.message.type === "incomingNotification") {
    return (
      <div className="message">
        <span className="message-content">{props.message.content}</span>
      </div>
    );
  }

  if (props.message.type === "connectedUser") {
    return (
      <div className="message">
        <span className="message-content">{props.message.name || "user"} has joined</span>
      </div>
    );
  }

  return null;
}

export default Message;