import { useState, useEffect } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import { getAuth } from "firebase/auth";

const MessageForm = () => {
  const [conversationId, setConversationId] = useState("");
  const [content, setContent] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim() === "") {
      alert("Please enter some content before submitting.");
      return;
    }
    const timestamp = new Date().toISOString();
    const messagesRef = collection(firestore, "messages");
    const newMessage = {
      conversationId,
      content,
      author: auth.currentUser.displayName,
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

  useEffect(() => {
    setIsDisabled(content.trim() === "");
  }, [content]);

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
      <button type="submit" disabled={isDisabled}>
        Submit
      </button>
    </form>
  );
};

export default MessageForm;
