import React, {Component} from 'react';
import Message from './Message.jsx';

function MessageList(props) {
  const messages = props.messages;
  // console.log(messages);
  const messageItems = messages.map(message => {
    return <Message message={message} key={message.id} />;
  });

  return (
    <main className="messages">
      {messageItems}
      {/*<div className="message system">
        Anonymous1 changed their name to nomnom.
      </div>*/}
    </main>
  );
}

export default MessageList;