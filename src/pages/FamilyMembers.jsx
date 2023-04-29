import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar
} from "@syncfusion/ej2-react-grids";

//DATA
import { employeesData, contextMenuItems, employeesGrid } from "../data/dummy";
import { familyMembersGrid } from "../data/gridData";
import { Header } from "../components";

import { db } from "../firebase/firebase";

const FamilyMembers = () => {
  return (
    <div className="m-2 md:m-10 p2 md:p10 bg-white rounded-3xl">
      <Header category="Settings" title="Family Members" />
      <GridComponent
        id="gridcomp"
        //dataSource={employeesData}
        allowPaging
        allowSorting
        toolbar={['Search']}
        width="auto"
      >
        <ColumnsDirective>
          {familyMembersGrid.map((item,index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services= {[Page, Search, Toolbar]}/>
      </GridComponent>
    </div>
  );
};

export default FamilyMembers;
