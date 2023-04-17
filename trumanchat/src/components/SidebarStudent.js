import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  getDoc
} from "@firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const SidebarStudent = ({ user }) => {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    const enrolledRef = collection(firestore, "enrolled");
    const enrolledQuery = query(enrolledRef, where("student", "==", user.email));
    const unsubscribe = onSnapshot(enrolledQuery, async (enrolledSnapshot) => {
      const classDocs = await Promise.all(
        enrolledSnapshot.docs.map(async (enrollmentDoc) => {
          const classId = enrollmentDoc.data().classId;
          const classRef = doc(firestore, "classes", classId);
          const classDoc = await getDoc(classRef);
          return { id: classDoc.id, ...classDoc.data() };
        })
      );
      setClasses(classDocs);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);
  

  const handleJoinClass = async () => {
    const classesRef = collection(firestore, "classes");
    const classQuery = query(classesRef, where("key", "==", className));
    const snapshot = await getDocs(classQuery);
    if (snapshot.size === 0) {
      alert("Class key not found");
      return;
    }
    const classData = snapshot.docs[0].data();
    const enrolledRef = collection(firestore, "enrolled");
    const newEnrollment = {
      classId: snapshot.docs[0].id,
      student: user.email,
    };
    try {
      await addDoc(enrolledRef, newEnrollment);
      console.log("Class joined:", classData.name);
      alert(`Successfully joined class ${classData.name}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClassSelect = (classItem) => {
    if (selectedClass === classItem) {
      setSelectedClass(null);
      localStorage.setItem("classID", null);
      localStorage.setItem("studentClassID", null);
    } else {
      setSelectedClass(classItem);
      localStorage.setItem("classID", classItem);
      localStorage.setItem("studentClassID", classItem);
      console.log(localStorage.getItem("classID"));
    }
  };
  
  

  const handleClassLeave = async () => {
    const enrollmentDocName = localStorage.getItem("studentClassID");
    const enrollmentRef = doc(firestore, "enrolled", enrollmentDocName);
    const enrollmentDoc = await getDoc(enrollmentRef);
    if (!enrollmentDoc.exists()) {
      alert("You are not enrolled in this class");
      return;
    }
    const enrollmentData = enrollmentDoc.data();
    if (enrollmentData.student !== user.email) {
      alert("You are not enrolled in this class");
      return;
    }
    try {
      await deleteDoc(enrollmentRef);
      console.log("Class left:", enrollmentDocName);
      alert("Successfully left the class");
      setSelectedClass(null);
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
            <li
              key={classItem.id}
              className={
                selectedClass === classItem.id ? "selected-class" : ""
              }
              onClick={() => handleClassSelect(classItem.id)}
            >
              <p>
                <strong>{classItem.name}</strong>
              </p>
            </li>
          ))}
        </ul>
      </div>
      {selectedClass ? (
        <div className="class-actions">
          <button className="delete-button" onClick={handleClassLeave}>
            Leave class
          </button>
        </div>
      ) : (
        <div className="create-class">
          <h2>Join a Class</h2>
          <input
            type="text"
            placeholder="Class Key"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <button className="delete-button" onClick={handleJoinClass} disabled={!className}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SidebarStudent;
