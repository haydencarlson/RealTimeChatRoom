import React, {Component} from 'react';
import Message from './message.jsx';
import MessageList from './messagelist.jsx';
import ChatBar from './ChatBar.jsx';
class App extends Component {
  render() {
    return (
    <div class="wrapper">
  <nav>
    <h1>Chatty</h1>
  </nav>

  <MessageList> </MessageList>
  <Message> </Message>
  <ChatBar> </ChatBar>

  </div>

    );
  }
}
export default App;
