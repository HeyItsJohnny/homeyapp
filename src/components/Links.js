import React from "react";
import {
  AiOutlineCalendar,
} from "react-icons/ai";
import { BiColorFill } from "react-icons/bi";
import { BsCalendarCheck } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { GrSchedules } from "react-icons/gr";
import { GoDashboard } from "react-icons/go";
import { BiFoodMenu } from "react-icons/bi";
import { MdFoodBank, MdCleaningServices } from "react-icons/md";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "dashboard",
        icon: <GoDashboard />,
        linktoname: "dashboard"
      },
    ],
  },
  {
    title: "Apps",
    links: [
      {
        name: "chores",
        icon: <MdCleaningServices />,
        linktoname: "chores"
      },
      {
        name: "calendar",
        icon: <AiOutlineCalendar />,
        linktoname: "calendar"
      },
      {
        name: "planner",
        icon: <BsCalendarCheck />,
        linktoname: "planner"
      },
      {
        name: "scheduler",
        icon: <GrSchedules />,
        linktoname: "scheduler"
      }
    ],
  },
  {
    title: "Meals",
    links: [
      {
        name: "schedule",
        icon: <BiFoodMenu />,
        linktoname: "food-scheduler"
      },
      {
        name: "recipes",
        icon: <MdFoodBank />,
        linktoname: "family-recipes"
      }
    ],
  },
  {
    title: "Settings",
    links: [
      {
        name: "family members",
        icon: <IoMdContacts/>,
        linktoname: "family-members"
      },
      {
        name: "shared logins",
        icon: <RiLockPasswordLine />,
        linktoname: "subscription-passwords"
      },
      {
        name: "color picker",
        icon: <BiColorFill />,
        linktoname: "color-picker"
      }
    ],
  },
  /*
  {
    title: "Apps",
    links: [
      {
        name: "calendar",
        icon: <AiOutlineCalendar />,
      },
      {
        name: "kanban",
        icon: <BsKanban />,
      },
      {
        name: "editor",
        icon: <FiEdit />,
      },
      {
        name: "color-picker",
        icon: <BiColorFill />,
      },
    ],
  },
  {
    title: "Charts",
    links: [
      {
        name: "line",
        icon: <AiOutlineStock />,
      },
      {
        name: "area",
        icon: <AiOutlineAreaChart />,
      },

      {
        name: "bar",
        icon: <AiOutlineBarChart />,
      },
      {
        name: "pie",
        icon: <FiPieChart />,
      },
      {
        name: "financial",
        icon: <RiStockLine />,
      },
      {
        name: "color-mapping",
        icon: <BsBarChart />,
      },
      {
        name: "pyramid",
        icon: <GiLouvrePyramid />,
      },
      {
        name: "stacked",
        icon: <AiOutlineBarChart />,
      },
    ],
  },
  */
];
