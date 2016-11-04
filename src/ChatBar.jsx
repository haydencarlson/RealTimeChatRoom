import React, {Component} from 'react';

class ChatBar extends Component {

  constructor(props) {   
    super(props);
    this.state = { message: '', user: this.props.currentUser };
    this.handleMessageChange= this.handleMessageChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUsernameCheck = this.handleUsernameCheck.bind(this);
    this.handleMessage= this.handleMessage.bind(this);
  }

  handleUsernameCheck(event) {
    if (event.key === "Enter") {
      console.log(this.state.user);
      this.props.checkUsername(this.state.user);
    }
  }
  handleNameChange(event) {
    this.setState({user: event.target.value});
    
  }

  handleMessage(event) {
    if (event.keyCode === 13) {
      this.props.handleMessage({message: this.state.message, user: this.state.user});
      this.state.message = "";
    }
  }

  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }

  render() {
    return (
      <footer>
        <input id="username" 
          type="text"
          placeholder={this.state.user}
          value={this.state.user}
          onChange={this.handleNameChange} 
          onKeyUp={this.handleUsernameCheck} />
          
          
        <input id="new-message"
          type="text" 
          placeholder="Type a message and hit ENTER"
          value={this.state.message}
          onChange={this.handleMessageChange}
          onKeyUp= {this.handleMessage} />
      </footer>
    );
  }
}
export default ChatBar;
