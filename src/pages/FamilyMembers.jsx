import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Edit,
  Toolbar
} from "@syncfusion/ej2-react-grids";

//DATA
import { employeesData, contextMenuItems, employeesGrid } from "../data/dummy";
import { familyMembersGrid } from "../data/gridData";
import { Header } from "../components";

import { db } from "../firebase/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const FamilyMembers = () => {

  const [familyMembers, setFamilyMembers] = useState([]);
  
  const fetchData = async () => {
    const couponsCollection = query(collection(db, "housemembers"),orderBy("Name"));
    onSnapshot(couponsCollection, (querySnapshot) => {
      const familyMembersList = [];
      querySnapshot.forEach((doc) => {
        var familyMembersData = {
          //id: doc.id,
          Name: doc.data().Name,
          Role: doc.data().Role,
        };
        familyMembersList.push(familyMembersData);
      });
      setFamilyMembers(familyMembersList);
      console.log(familyMembersList);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Settings" title="Family Members" />
      <GridComponent
        id="gridcomp"
        dataSource={familyMembers}
        allowPaging
        allowSorting
        toolbar={['Add','Search']}
        width="auto"
      >
        <ColumnsDirective>
          {familyMembersGrid.map((item,index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services= {[Page, Search, Edit, Toolbar]}/>
      </GridComponent>
    </div>
  );
};

export default FamilyMembers;
