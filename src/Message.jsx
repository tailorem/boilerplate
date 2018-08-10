import React, {Component} from 'react';

// function Content(props) {

//     if (props.message.content) {
//       const array = props.message.content.split(" ");
//       const re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/ig;
//       // let found = "";

//       let newArray = array.map(element => {
//         if (element.match(re)) {
//           const found = element.match(re);
//           return `{<img src={${found[0]}} />}`;
//           // array[index] = found[0];
//         }
//         return element;
//       });

//       // array.forEach((element, index) => {
//       //   console.log(element, index);
//       // });
//       newArray = newArray.join(" ");

//       console.log(newArray);
//     }

//   return (<span className="message-content">{newArray || props.message.content}</span>);
// }

function Message(props) {

  // TODO:
  // const re = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

  // if (re.test(props.message.content)) {
  //   return (
  //     <div className="message">
  //       <span className="message-username" style={{ color: props.message.userColor }}>{props.message.username}: </span>
  //       <div style={{ maxWidth: 40 + '%', textAlign: 'left' }}>
  //         <img src={props.message.content} className="image" style={{ display: 'inline' }} />
  //       </div>
  //     </div>
  //   );
  // }

    return (
      <div className="message">
        <span className="message-username" style={{ color: props.message.userColor }}>{props.message.username}: </span>
        <span className="message-content">{props.message.content}</span>
      </div>
    );
  // }

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