import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, where } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const conversationID = localStorage.getItem("classID");
  const messagesQuery = query(
    collection(firestore, "messages"),
    orderBy("timestamp", "asc"),
    where("conversationId", "==", String(conversationID).trim())
  );

  useEffect(() => {
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
  }, [messagesQuery]);

  return (
    <textarea
      rows="20"
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

