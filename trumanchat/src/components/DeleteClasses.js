import { collection, query, where, getDocs, deleteDoc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const deleteMessagesByConversationId = async (conversationId) => {
  const messagesRef = collection(firestore, "messages");
  const messagesQuery = query(messagesRef, where("conversationId", "==", conversationId));
  const snapshot = await getDocs(messagesQuery);
  snapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
};

export default deleteMessagesByConversationId;
