import React, {Component} from 'react';


function Message(props) {
  console.log(props);

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

  if (props.message.type === "incomingMessage") {
    const re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/ig;
    const found = props.message.content.match(re);
    if (found) {
      console.log("found", found);
      const split = props.message.content.split(" ");
      const altered = split.map(element => {
        if (element === found[0]) {
          return (
            <div className="message-content" style={{ maxWidth: 40 + '%', padding: 0, margin: 0 }}>
              <img src={found[0]} style={{ padding: 0, margin: 0 }} />
            </div>
          );
        }
        return element + " ";
      });
      return (
        <div className="message">
          <span className="message-username" style={{ color: props.message.userColor }}>{props.message.username}: </span>

            <span className="message-content">{altered}</span>

        </div>
      );
    } else {
      return (
        <div className="message">
          <span className="message-username" style={{ color: props.message.userColor }}>{props.message.username}: </span>
          <span className="message-content">{props.message.content}</span>
        </div>
      );
    }
  }

  return null;
}

export default Message;

