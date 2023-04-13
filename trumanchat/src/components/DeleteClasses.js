import { collection, getDocs, deleteDoc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const deleteAllClasses = async () => {
  const classesRef = collection(firestore, "classes");
  const snapshot = await getDocs(classesRef);
  snapshot.forEach((doc) => {
    deleteDoc(doc.ref);
  });
  alert("All classes deleted!");
};

export default deleteAllClasses;
