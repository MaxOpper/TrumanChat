import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
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
        .map(
          (message) =>
            `${new Date(message.timestamp).toLocaleString()} - ${message.author}: ${message.content}\n`
        )
        .join("")}
      style={{ width: '80%' , marginTop: '50px' }}
      readOnly
    />
  );
};

export default MessageList;
