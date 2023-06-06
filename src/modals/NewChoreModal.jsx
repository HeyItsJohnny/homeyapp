import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { db } from "../firebase/firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const NewChoreModal = () => {
  const [show, setShow] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const [frequency, setFrequency] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { currentColor } = useStateContext();

  const handleAssignedToChange = (event) => {
    setAssignedTo(event.target.value);
  };

  const handleFrequencyChange = (event) => {
    setFrequency(event.target.value);
  };

  const handleReset = () => {
    handleFrequencyChange("");
    handleAssignedToChange("");
    handleClose();
  };

  const fetchFamilyMembersData = async () => {
    const docCollection = query(
      collection(db, "housemembers"),
      orderBy("Name")
    );
    onSnapshot(docCollection, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        var data = {
          id: doc.id,
          Name: doc.data().Name,
          Role: doc.data().Role,
        };
        list.push(data);
      });
      setFamilyMembers(list);
    });
  };

  useEffect(() => {
    fetchFamilyMembersData();
    return () => {
      setFamilyMembers([]); // This worked for me
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    addRecipeDoc(e);
    handleReset();
  };

  async function addRecipeDoc(data) {
    try {
      await setDoc(doc(db, "chores", data.target.Meal.value), {
        Chore: data.target.Chore.value,
        AssignedTo: assignedTo,
        Frequency: frequency,
      });
    } catch (error) {
      alert("There was an error adding to the database: " + error);
    }
  }

  return <div>NewChoreModal</div>;
};

export default NewChoreModal;
