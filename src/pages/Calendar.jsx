import React, { useState, useEffect } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";

import { scheduleData } from "../data/dummy";
import { Header } from "../components";

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

const Calendar = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);

  const fetchData = async () => {
    const docCollection = query(collection(db, "calendarevents"));
    onSnapshot(docCollection, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        var data = {
          //Id: doc.id,
          Subject: doc.data().Subject,
          //Location: doc.data().Location,
          //Description: doc.data().Description,
          StartTime: doc.data().StartTime,
          EndTime: doc.data().EndTime,
          //IsAllDay: doc.data().IsAllDay,
          //RecurrenceRule: doc.data().RecurrenceRule,
          //RecurrenceException: doc.data().RecurrenceException,
          //CategoryColor: doc.data().CategoryColor,
        };
        list.push(data);
      });
      setCalendarEvents(list);
    });
  };

  const addEvent = async (args) => {
    //const db = firebase.firestore();
    console.log(args);
    //const { startTime, endTime, subject, location, description } = args;

    if (args.requestType === "eventCreated") {
      //console.log("Event ADDED");
      //console.log("Subject: " + args.addedRecords[0].Subject);

      //const addedData = [...calendarEvents];
      //const addedRow = args.addedRecords[0];

      //addedData.push(addedRow);
      //setCalendarEvents(addedData);

      try {
        const docRef = await addDoc(collection(db, "calendarevents"), {
          Subject: args.addedRecords[0].Subject,
          //Location: args.addedRecords[0].Location ?? "",
          //Description: args.addedRecords[0].Description  ?? "",
          StartTime: args.addedRecords[0].StartTime  ?? "",
          EndTime: args.addedRecords[0].EndTime ?? "",
          //IsAllDay: args.addedRecords[0].IsAllDay ?? "",
          //RecurrenceRule: args.addedRecords[0].RecurrenceRule ?? "",
          //RecurrenceException: args.addedRecords[0].RecurrenceException ?? "",
          //CategoryColor: doc.data().CategoryColor,
        });
      } catch (error) {
        alert("Error adding data to Database: " + error);
      }

    } else if (args.requestType === "eventChanged") {
      console.log("Event Edited");
    } else if (args.requestType === "eventRemoved") {
      console.log("Event Deleted");
    }

    /*
    const newEvent = {
      start: startTime,
      end: endTime,
      subject: subject,
      location: location,
      description: description,
    };

    db.collection("events")
      .add(newEvent)
      .then((docRef) => {
        console.log("Event added with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding event: ", error);
      });
      */
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="App" title="Calendar" />
      <ScheduleComponent
        currentView="Week"
        height="650px"
        eventSettings={{ dataSource: calendarEvents }}
        //popupOpen={addEvent}
        actionComplete={addEvent}
        //selectedDate={new Date(2021, 0, 10)}
      >
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
