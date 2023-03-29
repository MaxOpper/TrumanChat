import { useState } from "react";
import { collection, addDoc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const MessageForm = () => {
  const [conversationId, setConversationId] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const timestamp = new Date().toISOString();
    const messagesRef = collection(firestore, "messages");
    const newMessage = {
      conversationId,
      content,
      author,
      timestamp,
    };
    try {
      await addDoc(messagesRef, newMessage);
      setConversationId("");
      setContent("");
      setAuthor("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <label>
        Conversation ID:
        <input
          className="message-input"
          type="text"
          value={conversationId}
          onChange={(e) => setConversationId(e.target.value)}
        />
      </label>
      <br />
      <label>
        Content:
        <input
          className="message-input"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      <br />
      <label>
        Author:
        <input
          className="message-input"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <br />
      <button className="message-button" type="submit">Submit</button>
    </form>
  );
};

export default MessageForm;
