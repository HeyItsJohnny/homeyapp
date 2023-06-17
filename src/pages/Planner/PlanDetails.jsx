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

import {
  Box,
  Button,
  TextField,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { useFormik, Field, FormikProvider } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";

//DATA
import { familyPlansGrid } from "../../data/gridData";
import { Header } from "../../components";

import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

//import NewPlanModal from "../../modals/NewPlanModal";
import PlanSchedule from "./PlanSchedule";
import { parseISO, format } from 'date-fns';
import { useParams } from "react-router-dom";

const PlanDetails = () => {
  const { planid } = useParams();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [plan, setPlan] = useState({});

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const setPlanFromURL = async () => {
    try {
      const docRef = doc(db, "familyplans", planid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPlan(docSnap.data());
        //Set Start Date
        //Set End Date
      }
    } catch (err) {
      alert(err);
    }
  };

  const onChangeStartDate = (args) => {
    
    setStartDate(args.target.value);
    //const dateString = args.target.value;
    //const date = parseISO(dateString);
    //alert(date);
  }

  const onChangeEndDate = (args) => {
    setEndDate(args.target.value);
  }

  useEffect(() => {
    setPlanFromURL();
    return () => {
      setPlan([]);
    };
  }, []);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Plan Details" title={plan.PlanName} />
        <div className="mb-10">
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="StartDate"
              label="Start Date"
              type="date"
              fullWidth
              variant="filled"
              value={startDate}
              onChange={onChangeStartDate}
              //onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              margin="dense"
              required
              id="EndDate"
              label="End Date"
              type="date"
              fullWidth
              variant="filled"
              value={endDate}
              onChange={onChangeEndDate}
              //onBlur={formik.handleBlur}
              sx={{ gridColumn: "span 2" }}
            />
          </Box>
        </div>
      </div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Plan Details" title="Schedule" />
        <div className="mb-10">
          <PlanSchedule planid={planid} planstartdate={startDate} planenddate={endDate} />
        </div>
      </div>
    </>
  );
};

export default PlanDetails;
