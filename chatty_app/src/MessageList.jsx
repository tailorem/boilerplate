// jshint ignore: start

import React, { Component } from 'react';
import Message from './Message.jsx';

// Renders list of current messages
class MessageList extends Component {
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView();
  }

  render() {
    const messages = this.props.messages;
    const messageItems = messages.map(message => {
      return <Message message={ message } key={ message.id } />;
    });

    return (
      <main className='messages'>
        { messageItems }
        <div ref={(el) => { this.messagesEnd = el; }}></div>
      </main>
    );
  }
}

export default MessageList;