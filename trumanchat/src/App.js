import "./App.css";
import Header from "./components/Header";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";

function App() {
  return (
    <div className="App">
      <Header />
      <MessageList />
      <MessageForm />
    </div>
  );
}

export default App;

