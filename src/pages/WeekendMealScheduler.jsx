import React from "react";
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";

import { weekendMealScheduleKanbanGrid } from "../data/gridData";
import { sampleKanbanData } from "../data/dummy";
import { Header } from "../components";
import SetWeekendMealModal from "../modals/SetWeekendMealModal";

const WeekendMealScheduler = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Meals" title="Weekend Meal Schedule" />
      <div className="mb-10">
        <SetWeekendMealModal />
      </div>
      <KanbanComponent
        id="kanban"
        dataSource={sampleKanbanData}
        columns={[
          { headerText: 'Not Scheduled', keyField: 'Not Scheduled' },
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
