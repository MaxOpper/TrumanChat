import { useState, useEffect, useRef } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase_setup/firebase";

const RosterSidebar = () => {
  const [students, setStudents] = useState([]);
  const classIdRef = useRef(localStorage.getItem("classID"));

  const fetchRoster = (classId) => {
    if (!classId) {
      setStudents([]);
      return;
    }

    const enrolledRef = collection(firestore, "enrolled");
    const enrolledQuery = query(enrolledRef, where("classId", "==", classId));
    const unsubscribe = onSnapshot(enrolledQuery, (enrolledSnapshot) => {
      const studentList = enrolledSnapshot.docs.map((enrollmentDoc) => {
        return enrollmentDoc.data().studentName;
      });
      setStudents(studentList);
    });

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchRoster(classIdRef.current);

    const onStorageChange = (e) => {
      if (e.key === "classID") {
        classIdRef.current = e.newValue;
        if (unsubscribe) {
          unsubscribe();
        }
        fetchRoster(classIdRef.current);
      }
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="student-list">
        <h2>Class Roster</h2>
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              <p>
                <strong>{student}</strong>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RosterSidebar;







