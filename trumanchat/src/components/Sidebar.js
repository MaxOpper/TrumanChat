import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, addDoc } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";
import  generateKey  from "./generateKey";

const Sidebar = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");

  useEffect(() => {
    const classesRef = collection(firestore, "classes");
    const q = query(classesRef, where("professor", "==", user.email));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newClasses = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(newClasses);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleCreateClass = async () => {
    const classesRef = collection(firestore, "classes");
    const key = generateKey();
    const newClass = {
      name: className,
      professor: user.email,
      key: key
    };
    try {
      await addDoc(classesRef, newClass);
      setClassName("");
      console.log("Class created:", newClass.name);
      alert(`Class created with key ${key}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="sidebar">
      <div className="class-list">
        <h2>My Classes</h2>
        <ul>
          {classes.map((classItem) => (
            <li key={classItem.id}>
              <p>
                <strong>{classItem.name}</strong> ({classItem.key})
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="create-class">
        <h2>Create a Class</h2>
        <input
          type="text"
          placeholder="Class name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <button className="delete-button" onClick={handleCreateClass}>Create class</button>
      </div>
    </div>
  );
};

export default Sidebar;

