import { addDoc, collection } from "@firebase/firestore"
import { firestore } from "../firebase_setup/firebase"

const handleSubmit = ({ content, conversationId, author, timestamp }) => {
  if (!content || !conversationId || !author) {
    // Don't submit the message if any of the required fields are empty
    return;
  }

  const ref = collection(firestore, "messages");
  const data = {
    content,
    conversationId,
    author,
    timestamp,
  };

  try {
    addDoc(ref, data);
  } catch (err) {
    console.log(err);
  }
};

export default handleSubmit;
