import { collection, addDoc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const createClass = async (className) => {
  const classesRef = collection(firestore, "classes");
  const newClass = { name: className };
  try {
    await addDoc(classesRef, newClass);
    console.log("New class created:", newClass);
  } catch (err) {
    console.error(err);
  }
};

export default createClass;
