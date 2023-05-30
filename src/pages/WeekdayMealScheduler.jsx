import React from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

import { weekdayMealScheduleKanbanGrid } from "../data/gridData";
import { kanbanData } from "../data/dummy";
import { Header } from "../components";
import SetWeekdayMealModal from "../modals/SetWeekdayMealModal";

const WeekdayMealScheduler = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Meals" title="Weekday Schedule" />
      <div className="mb-10">
        <SetWeekdayMealModal />
      </div>
      <KanbanComponent
        id="kanban"
        dataSource={kanbanData}
        cardSettings={{ contentField: "Summary", headerField: "Id" }}
        keyField="Status"
      >
        <ColumnsDirective>
          {weekdayMealScheduleKanbanGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};


export default WeekdayMealScheduler;
