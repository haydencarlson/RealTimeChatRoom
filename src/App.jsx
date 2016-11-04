import React, {Component} from 'react';
import Message from './message.jsx';
import MessageList from './messagelist.jsx';
import ChatBar from './ChatBar.jsx';
const socket = io('http://localhost:3001/', { path: '/socket' });

var chatData = {
      currentUser: {name: "Anonymous"},
      messages: [],
      userCount: 0
    };

class App extends Component {
  constructor(props) {
    super(props)
    this.state = chatData;
    this.handleMessage = this.handleMessage.bind(this);
    this.postNotification = this.postNotification.bind(this);
  }
  componentDidMount() { 
    socket.on('message', function(data){
      data.type = "message"; 
      this.setState({messages: this.state.messages.concat(data), currentUser: data.username})
    }.bind(this)); 

    socket.on('notification', function(notification){
      notification.type = "notfication";
      this.setState({messages: this.state.messages.concat(notification)})
    }.bind(this));

    socket.on('userCountUp', function(userCountVar) {
      console.log(userCountVar);
      this.setState({userCount: userCountVar })
    }.bind(this));

    socket.on('userCountDown', function(userCountVar) {
      console.log(userCountVar);
      this.setState({userCount: userCountVar })
    }.bind(this));
  }
  componentWillUnmount() {
    this.ws.close();
  }
  handleMessage(messageData) {
    const newMessage = {
      id: socket.id, 
      username: messageData.user, 
      content: messageData.message}
    socket.send(newMessage);
  }

  render() {
    return (
      <div className="wrapper">
        <nav>
        <p className="userCount"> Users Online: {this.state.userCount} </p>
          <h1>Chatty</h1> 
        </nav>
        <MessageList 
          messages={this.state.messages} />
        <ChatBar 
          handleMessage={this.handleMessage} 
          checkUsername={this.postNotification}
          currentUser={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;
