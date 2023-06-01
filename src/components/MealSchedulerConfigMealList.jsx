import React, { useState, useEffect, useRef } from "react";
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
import { familyMealsSelectionGrid } from "../data/gridData";
import { Header } from "../components";

import { db } from "../firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { blue } from "@mui/material/colors";

const MealSchedulerConfigMealList = () => {
  let grid;
  const [familyMeals, setFamilyMeals] = useState([]);
  const [selectedFamilyMeals, setSelectedFamilyMeals] = useState([]);

  const fetchData = async () => {
    const docCollection = query(
      collection(db, "familymeals"),
      orderBy("FoodType")
    );
    onSnapshot(docCollection, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        var data = {
          id: doc.id,
          Meal: doc.id,
          FoodType: doc.data().FoodType,
          Description: doc.data().Description,
        };
        list.push(data);
      });
      setFamilyMeals(list);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleActionComplete = (args) => {
    console.log(args);
  };

  const rowSelected = () => {
    if (grid) {
      //setSelectedFamilyMeals([]);
      /** Get the selected row indexes */
      //const selectedrowindex = grid.getSelectedRowIndexes();
      /** Get the selected records. */
      const selectedrecords = grid.getSelectedRecords();

      setSelectedFamilyMeals(selectedrecords);

      //alert(selectedrowindex + " : " + JSON.stringify(selectedrecords));
    }
  };

  const clear = () => {
    setSelectedFamilyMeals([]);
  };

  const test = () => {
    console.log(selectedFamilyMeals);
  };

  return (
    <>
      <Header
        category="Select the Meals you want to add to the Scheduler."
        title=""
      />

    <button
        type="button"
        style={{
          backgroundColor: blue,
          color: "Blue",
          borderRadius: "10px",
        }}
        className={`text-md p-3 hover:drop-shadow-xl`}
        onClick={clear}
      >
        clear
      </button>

      <button
        type="button"
        style={{
          backgroundColor: blue,
          color: "Blue",
          borderRadius: "10px",
        }}
        className={`text-md p-3 hover:drop-shadow-xl`}
        onClick={test}
      >
        GET ROWS
      </button>

      <GridComponent
        id="gridcomp"
        dataSource={familyMeals}
        actionComplete={handleActionComplete}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        editSettings={{
          allowDeleting: true,
        }}
        width="auto"
        rowSelected={rowSelected}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          {familyMealsSelectionGrid.map((item, index) => (
            <ColumnDirective key={item.id} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection]} />
      </GridComponent>
    </>
  );
};

export default MealSchedulerConfigMealList;
