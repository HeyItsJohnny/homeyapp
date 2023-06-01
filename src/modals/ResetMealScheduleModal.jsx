import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { db } from "../firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const ResetMealScheduleModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Handling Reset
  const [mealscheduleToDelete, setMealscheduleToDelete] = useState([]);
  const [familyMeals, setFamilyMeals] = useState([]);

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
      alert("Error getting data from Firestore:", error);
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

  const getFamilyMeals = async () => {
    try {
      const docCollection = query(collection(db, "familymeals"));
      onSnapshot(docCollection, (querySnapshot) => {
        const list = [];

        querySnapshot.forEach((doc) => {
          const FoodType = doc.data().FoodType;
          var DocFoodType = "";

          if (FoodType === "Breakfast") {
            DocFoodType = "1. Breakfast";
          } else if (FoodType === "Lunch") {
            DocFoodType = "2. Lunch";
          } else if (FoodType === "Dinner") {
            DocFoodType = "3. Dinner";
          }

          var data = {
            id: doc.id,
            Meal: doc.id,
            Description: doc.data().Description,
            DayOfWeek: "Meals",
            MealType: DocFoodType,
          };
          list.push(data);
        });
        setFamilyMeals(list);
      });
    } catch (error) {
      alert("Error getting data from Firestore:", error);
    }
  };

  const addMealsToScheduler = async () => {
    familyMeals.forEach((doc) => {
      addMealToScheduler(doc);
    });
  };

  async function addMealToScheduler(doc) {
    try {
      console.log(doc);
      await addDoc(collection(db, "mealschedule"), {
        Meal: doc.Meal,
        Description: doc.Description,
        DayOfWeek: doc.DayOfWeek,
        MealType: doc.MealType
      });
    } catch(error) {
      alert("Error adding data to Firestore:", error);
    }
    
  }
  const handleSubmit = () => {
    

    getMealScheduleToDelete();
    deleteWeekendMealScheduleData();

    //Get and Add Meals to Scheduler
    getFamilyMeals();
    addMealsToScheduler();
    handleClose();
  }

  const handleResetClick = () => {
    setMealscheduleToDelete([]);
    setFamilyMeals([]);

    //Delete Current Weekday Schedule
    getMealScheduleToDelete();
    deleteWeekendMealScheduleData();

    //Get and Add Meals to Scheduler
    getFamilyMeals();
    addMealsToScheduler();
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
