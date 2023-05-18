import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Edit,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

//DATA
import { employeesData, contextMenuItems, employeesGrid } from "../data/dummy";
import { familyMembersGrid } from "../data/gridData";
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

const FamilyMembers = () => {
  const [familyMembers, setFamilyMembers] = useState([]);

  const fetchData = async () => {
    const couponsCollection = query(
      collection(db, "housemembers"),
      orderBy("Name")
    );
    onSnapshot(couponsCollection, (querySnapshot) => {
      const familyMembersList = [];
      querySnapshot.forEach((doc) => {
        var familyMembersData = {
          id: doc.id,
          Name: doc.data().Name,
          Role: doc.data().Role,
        };
        familyMembersList.push(familyMembersData);
      });
      setFamilyMembers(familyMembersList);
    });
  };

  const handleActionComplete = async (args) => {
    //console.log(args);
    if (args.requestType === "save" && args.action === "add") {
      //ADD data to Firestore
      const addedData = [...familyMembers];
      const addedRow = args.data;

      addedData.push(addedRow);
      setFamilyMembers(addedData);

      try {
        const docRef = await addDoc(collection(db, "housemembers"), {
          Name: args.data.Name,
          Role: args.data.Role,
        });
      } catch (error) {
        alert("Error adding data to Database: " + error);
      }
    } else if (args.requestType === "save" && args.action === "edit") {
      //EDIT data to Firestore
      const updatedData = [...familyMembers];
      const updatedRow = args.data;
      const rowIndex = updatedData.findIndex(
        (data) => data.id === updatedRow.id
      );

      if (rowIndex > -1) {
        updatedData[rowIndex] = updatedRow;
        setFamilyMembers(updatedData);

        try {
          const familyMembersRef = doc(db, "housemembers", updatedRow.id);
          await updateDoc(familyMembersRef, {
            Name: args.data.Name,
            Role: args.data.Role,
          });
        } catch (error) {
          alert("Error editing data to Database: " + error);
        }
      }
    } else if (args.requestType === "delete") {
      //DELETE data from Firestore (GOOD FOR NOW)
      console.log(args);
      const deletedData = [...familyMembers];
      const deletedRow = args.data[0];
      try {
        await deleteDoc(doc(db, "housemembers", deletedRow.id));
      } catch (error) {
        console.log("Error deleting data from Firestore:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Settings" title="Family Members" />
      <GridComponent
        id="gridcomp"
        dataSource={familyMembers}
        actionComplete={handleActionComplete}
        allowPaging
        allowSorting
        toolbar={["Add", "Search", "Edit", "Delete", "Update", "Cancel"]}
        editSettings={{
          allowDeleting: true,
          allowEditing: true,
          allowAdding: true,
        }}
        width="auto"
      >
        <ColumnsDirective>
          {familyMembersGrid.map((item, index) => (
            <ColumnDirective key={item.id} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default FamilyMembers;
