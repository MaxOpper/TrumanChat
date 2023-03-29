import { collection, getDocs, writeBatch } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const deleteAllMessages = async () => {
  const messagesRef = collection(firestore, "messages");
  const snapshot = await getDocs(messagesRef);
  const batch = writeBatch(firestore);
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
  console.log("All messages deleted.");
};

export default deleteAllMessages;
