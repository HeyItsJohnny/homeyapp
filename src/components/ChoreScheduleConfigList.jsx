import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Selection,
  Page,
  Search,
  Inject,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

//DATA
import { choresScheduleGrid } from "../data/gridData";
import { Header } from "../components";

import { db } from "../firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { blue } from "@mui/material/colors";

const ChoreScheduleConfigList = () => {
  let grid;
  const [choreSchedule, setChoreSchedule] = useState([]);
  const { currentColor } = useStateContext();

  const fetchData = async () => {
    const docCollection = query(collection(db, "choreschedule"));
    onSnapshot(docCollection, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        var data = {
          id: doc.id,
          Chore: doc.data().Chore,
        };
        list.push(data);
      });
      setChoreSchedule(list);
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      setChoreSchedule([]); // This worked for me
    };
  }, []);

  const handleActionComplete = (args) => {
    console.log(args);
  };

  const getSelectedRows = () => {
    if (grid) {
      const selectedrecords = grid.getSelectedRecords();
      selectedrecords.forEach((data) => {
        //addToScheduler(data);
      });
    }
  };

  const addToScheduler = async (data) => {
    try {
      /*
        const FoodType = data.FoodType;
        var DocFoodType = "";
  
        if (FoodType === "Breakfast") {
          DocFoodType = "1. Breakfast";
        } else if (FoodType === "Lunch") {
          DocFoodType = "2. Lunch";
        } else if (FoodType === "Dinner") {
          DocFoodType = "3. Dinner";
        }
        await addDoc(collection(db, "mealschedule"), {
          Meal: data.Meal,
          Description: data.Description,
          DayOfWeek: "Meals",
          MealType: DocFoodType
        });
        */
    } catch (error) {
      alert("Error adding data to Database: " + error);
    }
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Chores" title="Chore List" />
      <div className="mb-10">
        <button
          type="button"
          style={{
            backgroundColor: currentColor,
            color: "White",
            borderRadius: "10px",
          }}
          className={`text-md p-3 hover:drop-shadow-xl`}
          onClick={getSelectedRows}
        >
          Add Rows to Schedule
        </button>
      </div>
      <GridComponent
        id="gridcomp"
        dataSource={choreSchedule}
        actionComplete={handleActionComplete}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        editSettings={{
          allowDeleting: true,
        }}
        width="auto"
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          {choresScheduleGrid.map((item, index) => (
            <ColumnDirective key={item.id} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection]} />
      </GridComponent>
    </div>
  );
};

export default ChoreScheduleConfigList;
