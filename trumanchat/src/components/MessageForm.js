import { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { getAuth } from "firebase/auth";

const MessageForm = () => {
  const [conversationId, setConversationId] = useState("");
  const [content, setContent] = useState("");
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const messagesRef = collection(firestore, "messages");
    const newMessage = {
      conversationId,
      content,
      author: auth.currentUser.displayName, // set the author field to the current user's display name
      timestamp,
    };
    try {
      await addDoc(messagesRef, newMessage);
      setConversationId("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Conversation ID:
        <input
          type="text"
          value={conversationId}
          onChange={(e) => setConversationId(e.target.value)}
        />
      </label>
      <br />
      <label>
        Content:
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MessageForm;
