import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

const handleSubmit = ({ content, conversationId, author, timestamp }) => {
  const ref = collection(firestore, "messages");

  if (!content || !conversationId || !author) {
    console.log("Missing required fields. Message not sent.");
    return;
  }

  const data = {
    content,
    conversationId,
    author,
    timestamp,
  };

  try {
    addDoc(ref, data);
    console.log("Message sent successfully.");
  } catch (err) {
    console.error("Error sending message:", err);
  }
};

export default handleSubmit;
