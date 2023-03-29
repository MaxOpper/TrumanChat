import "./App.css";
import Header from "./components/Header";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import deleteAllMessages from "./components/deleteMessage.js";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
      <button className="delete-button" onClick={deleteAllMessages}>Delete All Messages</button>
      </div>
      <MessageList />
      <MessageForm />
    </div>
    
  );
}

export default App;

