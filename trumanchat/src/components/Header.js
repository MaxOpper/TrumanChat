import { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import deleteAllMessages from "../components/deleteMessage.js";

const Header = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const handleDelete = () => {
    deleteAllMessages();
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in as:", user.displayName);
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  // Listen for changes to the authentication state and update the user state
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <div className="header">
      <div className="title-container">
        <h1 className="title">Truman Chat</h1>
      </div>
      {user ? (
        <div className="user-info">
          <div className="delete-container">
            <button className="delete-button"onClick={handleDelete}>Delete All Messages</button>
          </div>
          <div className="logout-container">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <div className="login-container">
          <button onClick={handleGoogleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Header;
