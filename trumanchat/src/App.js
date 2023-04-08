import "./App.css";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import Sidebar from "./components/Sidebar";

function App() {
  const [user, setUser] = useState(null);
  const [isProfessor, setIsProfessor] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if ((user.email.endsWith("@truman.edu") && !/\d/.test(user.email)) || user.email === "mto1776@truman.edu") {
          setIsProfessor(true);
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <div className="App">
      <Header user={user} auth={auth} />
      {user ? (
        <div className="main-container">
          <div className="message-list-container">
            <MessageList />
          </div>
          <div className="message-form-container">
            <MessageForm />
          </div>
          {isProfessor && (
            <div className="sidebar-container">
              <Sidebar user={user} />
            </div>
          )}
        </div>
      ) : (
        <div className="login-message">
          Please log in to see messages and post new messages.
        </div>
      )}
    </div>
  );
}

export default App;

