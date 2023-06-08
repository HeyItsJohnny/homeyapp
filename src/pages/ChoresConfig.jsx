import React from "react";
import ChoreList from "./ChoresList";
import ChoreScheduleConfigList from "../components/ChoreScheduleConfigList";

const ChoresConfig = () => {
  return (
    <>
      <ChoreScheduleConfigList />
      <ChoreList />
    </>
  );
};

export default ChoresConfig;
