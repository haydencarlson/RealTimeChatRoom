import React, {Component} from 'react';
import Message from './message.jsx'
class MessageList extends Component {
  render() {

    return (
      <div id="message-list">
        { 
          this.props.messages.map((message,index) => {
            if (message.type === "message") {
              return <Message key={index} username={message.username} content={message.content} />
            } else {
              return <div className="systemMessage" key={index}>{message.content} </div>
            }
          })

        }
      </div>
    );
  }
}

export default MessageList;
