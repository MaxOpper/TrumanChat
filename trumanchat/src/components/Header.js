import { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, addDoc, doc, getDoc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";


const Header = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [isProfessor, setIsProfessor] = useState(
    localStorage.getItem("isProfessor") === "true"
  );
  

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user.email.endsWith("@truman.edu") || user.email === "carterphilipp1@gmail.com" || user.email === "maxwell8270@gmail.com") {
        console.log("Logged in as:", user.displayName);
        if (!/\d/.test(user.email.split("@")[0])) {
          setIsProfessor(true);
          localStorage.setItem("isProfessor", true);
        } else {
          setIsProfessor(false);
          localStorage.setItem("isProfessor", false);
        }
        if (user.email === "mto1776@truman.edu") {
          setIsProfessor(true);
          localStorage.setItem("isProfessor", true)
        }

        // check if the user document exists
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
          // create the user document with the username and professor status
          const newUser = {
            username: user.displayName,
            isProfessor: isProfessor,
          };
          await addDoc(collection(firestore, "users"), newUser);
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
      setIsProfessor(false);
      localStorage.removeItem("isProfessor");
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
      {user && (
        <div className="user-info">
          <div className="logout-container">
            <button onClick={handleLogout}>Logout</button>
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
