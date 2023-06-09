import React, { useState, useEffect } from "react";
import { KanbanComponent } from "@syncfusion/ej2-react-kanban";

import { Header } from "../../components";

import { db } from "../../firebase/firebase";

import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Chores = () => {
  const [choreSchedule, setChoreSchedule] = useState([]);

  const fetchData = async () => {
    const docCollection = query(collection(db, "choreschedule"));
    onSnapshot(docCollection, (querySnapshot) => {
      const list = [];
      var itemCount = 1;
      querySnapshot.forEach((doc) => {
        var data = {
          Id: doc.id,
          Status: doc.data().Status,
          AssignedTo: doc.data().AssignedTo,
        };
        list.push(data);
        itemCount += 1;
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

  const addEvent = async (args) => {
    if (args.requestType === "cardChanged") {
      //Updated
      try {
        const mealScheduleRef = doc(
          db,
          "choreschedule",
          args.changedRecords[0].Id
        );
        await updateDoc(mealScheduleRef, {
          Status: args.changedRecords[0].Status,
          AssignedTo: args.changedRecords[0].AssignedTo,
        });
      } catch (error) {
        alert("Error editing data to Database: " + error);
      }
    } else if (args.requestType === "cardRemoved") {
      //Deleted
      try {
        await deleteDoc(doc(db, "choreschedule", args.deletedRecords[0].Id));
      } catch (error) {
        alert("Error deleting data from Database: " + error);
      }
    }
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Chores" title="Chore Schedule" />
        <KanbanComponent
          id="kanban"
          dataSource={choreSchedule}
          columns={[
            { headerText: "Not Started", keyField: "Not Started" },
            { headerText: "This Week", keyField: "This Week" },
            { headerText: "Daily Chores", keyField: "Daily Chores" },
            { headerText: "Completed", keyField: "Completed" },
          ]}
          //cardSettings={{ contentField: "Description", headerField: "Id" }}
          cardSettings={{ headerField: "Id" }}
          keyField="Status"
          swimlaneSettings={{ headerText: "Assigned To", keyField: "AssignedTo" }}
          actionComplete={addEvent}
        ></KanbanComponent>
      </div>
    </>
  );
};

export default Chores;
