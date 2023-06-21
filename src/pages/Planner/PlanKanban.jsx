import React, { useState, useEffect } from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import { PlanKanbanGrid } from "../../data/gridData";

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

  const fetchData = async () => {
    const docCollection = query(collection(db, "familyplans", planid, "plankanban"));
    onSnapshot(docCollection, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        var data = {
          id: doc.id,
          Description: doc.data().Description,
          PersonResponsible: doc.data().PersonResponsible,
          Status: doc.data().Status
        };
        list.push(data);
      });
      setPlanKanban(list);
    });
  };

  useEffect(() => {
    fetchData();
    return () => {
      setPlanKanban([]); // This worked for me
    };
  }, []);

  return (
    <KanbanComponent
      id="kanban"
      dataSource={planKanban}
      cardSettings={{ contentField: "Description", headerField: "id" }}
      keyField="Status"
    >
      <ColumnsDirective>
        {PlanKanbanGrid.map((item, index) => (
          <ColumnDirective key={index} {...item} />
        ))}
      </ColumnsDirective>
    </KanbanComponent>
  );
};

export default PlanKanban;
