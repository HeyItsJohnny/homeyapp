import React, { useState, useEffect } from "react";
import { KanbanComponent, ColumnsDirective, ColumnDirective  } from "@syncfusion/ej2-react-kanban";
import { kanbanData, kanbanGrid } from '../../data/dummy';

import { db } from "../../firebase/firebase";

import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const PlanKanban = ({ planid }) => {
  const [planKanban, setPlanKanban] = useState([]);

  return (
    <KanbanComponent
      id="kanban"
      dataSource={kanbanData}
      cardSettings={{ contentField: "Summary", headerField: "Id" }}
      keyField="Status"
    >
      <ColumnsDirective>
        {kanbanGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
    </KanbanComponent>
  );
};

export default PlanKanban;
