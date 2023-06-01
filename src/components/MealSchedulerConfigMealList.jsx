import React, { useState, useEffect } from "react";
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

const MealSchedulerConfigMealList = () => {
  const [familyMeals, setFamilyMeals] = useState([]);

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

  const handleActionComplete = async (args) => {
    console.log(args);
  };

  return (
    <>
      <Header category="Select the Meals you want to add to the Scheduler." title="" />

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
      >
        <ColumnsDirective>
          {familyMealsSelectionGrid.map((item, index) => (
            <ColumnDirective key={item.id} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection,]} />
      </GridComponent>
    </>
  );
};

export default MealSchedulerConfigMealList;
