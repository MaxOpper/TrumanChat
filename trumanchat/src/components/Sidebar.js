import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const Sidebar = ({ user }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classesRef = collection(firestore, "classes");
      const q = query(classesRef, where("professor", "==", user.email));
      const querySnapshot = await getDocs(q);
      const classesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClasses(classesList);
    };

    if (user) {
      fetchClasses();
    }
  }, [user]);

  return (
    <div className="sidebar">
      {classes.map((classObj) => (
        <div key={classObj.id} className="class">
          {classObj.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
