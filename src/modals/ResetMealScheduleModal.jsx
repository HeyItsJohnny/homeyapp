import React, { useState } from "react";
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
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { docClick } from "@syncfusion/ej2-react-richtexteditor";

const ResetMealScheduleModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Handling Reset
  const [mealscheduleToDelete, setMealscheduleToDelete] = useState([]);

  const { currentColor } = useStateContext();

  //Delete Meal Schedule
  const getMealScheduleToDelete = async () => {
    try {
      const docCollection = query(collection(db, "mealschedule"));
      onSnapshot(docCollection, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          var data = {
            id: doc.id,
          };
          list.push(data);
        });
        setMealscheduleToDelete(list);
      });
    } catch (error) {
      alert("Error deleting data from Firestore:", error);
    }
  };

  const deleteWeekendMealScheduleData = async () => {
    mealscheduleToDelete.forEach((doc) => {
      deleteData(doc.id);
    });
  };

  const deleteData = async (docID) => {
    try {
      await deleteDoc(doc(db, "mealschedule", docID));
    } catch (error) {
      alert("Error deleting data from Firestore:", error);
    }
  };

  //Add new Meal Schedule
  /*
  const getFamilyMeals = async () => {
    try {
      const docCollection = query(collection(db, "mealschedule"));
      onSnapshot(docCollection, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          var data = {
            id: doc.id,
          };
          list.push(data);
        });
        setMealscheduleToDelete(list);
      });
    } catch (error) {
      alert("Error deleting data from Firestore:", error);
    }
  };

  
  async function addRecipeDoc(data) {
    const docRef = await addDoc(collection(db, "familyrecipes"), {
      Recipe: data.target.Recipe.value,
      Description: data.target.Description.value,
      FoodType: foodType,
    });
  }
  */

  const SetNewData = async () => {
    /*
          const FoodType = doc.data().FoodType;
          var DocFoodType = "";
  
          if (FoodType === "Breakfast") {
            DocFoodType = '1. Breakfast';
          } else if (FoodType === "Lunch") {
            DocFoodType = '2. Lunch';
          } else if (FoodType === "Dinner") {
            DocFoodType = '3. Dinner';
          }
          */
  };

  const handleResetClick = () => {
    //Delete Current Weekday Schedule
    getMealScheduleToDelete();
    deleteWeekendMealScheduleData();
    //addMealSchedulerDoc(e);
    handleClose();
  };

  return (
    <>
      <button
        type="button"
        style={{
          backgroundColor: currentColor,
          color: "White",
          borderRadius: "10px",
        }}
        className={`text-md p-3 hover:drop-shadow-xl`}
        onClick={handleShow}
      >
        Reset Schedule
      </button>
      <Dialog open={show} onClose={handleClose}>
        <form>
          <DialogTitle>Reset Schedule</DialogTitle>
          <DialogContent>
            Do you want to reset the Weekday Meals?
            <br />
            <br />
            <b>
              *This will erase the current schedule (Weekday & Weekend) and add
              in new meals created*
            </b>
          </DialogContent>
          <DialogActions>
            <button
              type="button"
              style={{
                backgroundColor: currentColor,
                color: "White",
                borderRadius: "10px",
              }}
              className={`text-md p-3 hover:drop-shadow-xl`}
              onClick={handleResetClick}
            >
              Reset
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ResetMealScheduleModal;
