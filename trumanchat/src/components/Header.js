import { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc } from "@firebase/firestore";
import deleteAllMessages from "../components/deleteMessage.js";
import { firestore } from "../firebase_setup/firebase";
import  generateKey  from "../components/generateKey";
import deleteAllClasses from "../components/DeleteClasses.js";

const Header = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [isProfessor, setIsProfessor] = useState(false);
  const [className, setClassName] = useState("");

  const handleDelete = () => {
    deleteAllMessages();
  };

  const handleDeleteclass = () => {
    deleteAllClasses();
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user.email.endsWith("@truman.edu")) {
        console.log("Logged in as:", user.displayName);
        if (user.email === "mto1776@truman.edu") {
          setIsProfessor(true);
        }
      } else {
        await signOut(auth);
        alert("Only users with @truman.edu emails can log in");
      }
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

  const handleCreateClass = async () => {
    const classesRef = collection(firestore, "classes");
    const key = generateKey();
    const newClass = {
      name: className,
      professor: user.email,
      key: key
    };
    try {
      await addDoc(classesRef, newClass);
      setClassName("");
      console.log("Class created:", newClass.name);
      alert(`Class created with key ${key}`);
    } catch (err) {
      console.error(err);
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
      {user && (
        <div className="user-info">
          {isProfessor && (
            <div className="professor-menu">
              <input
                type="text"
                placeholder="Class name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
              <button onClick={handleCreateClass}>Create class</button>
            </div>
          )}
          <div className="logout-container">
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="delete-container">
            <button className="delete-button" onClick={handleDelete}>
              Delete All Messages
            </button>
            <button className="delete-button" onClick={handleDeleteclass}>
              Delete All Classes
            </button>
          </div>
        </div>
      )}
      {!user && (
        <div className="login-container">
          <button onClick={handleGoogleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Header;

