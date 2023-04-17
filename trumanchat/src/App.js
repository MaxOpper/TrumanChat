import "./App.css";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header";
import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";
import Sidebar from "./components/Sidebar";
import SidebarStudent from "./components/SidebarStudent";
import RosterSidebar from "./components/RosterSideBar";

function App() {
  const [user, setUser] = useState(null);
  const [isProfessor, setIsProfessor] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (((user.email.endsWith("@truman.edu") && !/\d/.test(user.email)) || user.email === "mto1776@truman.edu") ) {
          setIsProfessor(true);
        } else {
          setIsProfessor(false);
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
          {isProfessor && (
            <div className="sidebar-container">
              <Sidebar user={user} />
            </div>
          )}
          {!isProfessor && (
            <div className="sidebar-container">
              <SidebarStudent user={user} />
            </div>
          )}
          <div className="message-list-container">
            <MessageList />
            <MessageForm />
          </div>
          <div className="sidebar-container"> 
            <RosterSidebar />
          </div>
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

