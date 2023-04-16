import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, where } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import LRUCache from 'lru-cache';

const cache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 5 // 5 minutes
});

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const conversationID = localStorage.getItem("classID");
  const messagesQuery = query(
    collection(firestore, "messages"),
    orderBy("timestamp", "asc"),
    where("conversationId", "==", String(conversationID).trim())
  );

  useEffect(() => {
    const cachedMessages = cache.get(conversationID);
    if (cachedMessages) {
      setMessages(cachedMessages);
    } else {
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const messageList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageList);
        cache.set(conversationID, messageList);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [conversationID, messagesQuery]);

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

