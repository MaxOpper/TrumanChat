import { useState, useEffect } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const Sidebar = ({ user }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const classesRef = collection(firestore, "classes");
    const unsubscribe = onSnapshot(classesRef, (querySnapshot) => {
      const newClasses = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.professor === user.email) {
          newClasses.push({
            id: doc.id,
            name: data.name,
            key: data.key,
          });
        }
      });
      setClasses(newClasses);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="sidebar">
      <h3>Your Classes</h3>
      <ul>
        {classes.map((c) => (
          <li key={c.id}>
            {c.name} ({c.key})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
