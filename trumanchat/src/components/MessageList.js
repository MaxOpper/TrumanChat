import { useState, useEffect } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messageList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messageList);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <textarea
      rows="10"
      value={messages
        .map((message) => `${message.author}: ${message.content}\n`)
        .join("")}
      readOnly
    />
  );
};

export default MessageList;
