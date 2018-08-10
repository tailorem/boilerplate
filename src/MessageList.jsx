import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView();
  }

  render() {

    console.log("MSPROPS", this.props);
    const messages = this.props.messages;
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
        <div ref={(el) => { this.messagesEnd = el; }}></div>
      </main>
    );

  }
}

export default MessageList;