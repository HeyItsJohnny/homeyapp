import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

import { weekendMealScheduleKanbanGrid } from "../data/gridData";
import { sampleKanbanData } from "../data/dummy";
import { Header } from "../components";
import WeekendMealResetModal from "../modals/WeekendMealResetModal";

import { db } from "../firebase/firebase";

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const WeekendMealScheduler = () => {

  const [mealSchedule, setMealSchedule] = useState([]);

  const fetchData = async () => {
    const docCollection = query(collection(db, "mealschedule"));
    onSnapshot(docCollection, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        var data = {
          Id: doc.id,
          Meal: doc.data().Meal,
          MealType: doc.data().MealType,
          Description: doc.data().Description,
          DayOfWeek: doc.data().DayOfWeek
        };
        list.push(data);
      });
      setMealSchedule(list);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Meals" title="Weekend Meal Schedule" />
      <div className="mb-10">
        <WeekendMealResetModal />
      </div>
      <KanbanComponent
        id="kanban"
        dataSource={sampleKanbanData}
        columns={[
          { headerText: 'Meals', keyField: 'Meals' },
          { headerText: 'Monday', keyField: 'Monday' },
          { headerText: 'Tuesday', keyField: 'Tuesday' },
          { headerText: 'Wednesday', keyField: 'Wednesday' },
          { headerText: 'Thursday', keyField: 'Thursday' },
          { headerText: 'Friday', keyField: 'Friday' },
          { headerText: 'Saturday', keyField: 'Saturday' },
          { headerText: 'Sunday', keyField: 'Sunday' },
        ]}
        
        cardSettings={{ contentField: "Description", headerField: "Meal" }}
        keyField="DayOfWeek"
        swimlaneSettings={{keyField: "MealType"}}
      >
      </KanbanComponent>
    </div>
  );
};

export default WeekendMealScheduler;
