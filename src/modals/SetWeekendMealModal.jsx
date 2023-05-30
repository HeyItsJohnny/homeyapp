import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

const SetWeekendMealModal = () => {
  const [show, setShow] = useState(false);
  const [dayOfTheWeek, setDayOfTheWeek] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { currentColor } = useStateContext();

  const handleDayOfWeekChange = (event) => {
    setDayOfTheWeek(event.target.value);
  };

  const handleReset = () => {
    setDayOfTheWeek("");
    handleClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMealSchedulerDoc(e);
    handleReset();
  };

  async function addMealSchedulerDoc(data) {
    const docRef = await addDoc(collection(db, "mealscheduler"), {
      /*
        Recipe: data.target.Recipe.value,
        ServingSize: data.target.ServingSize.value,
        FoodType: foodType,
        */
    });
  }

  return (
    <>
      <button
        type="button"
        style={{
          backgroundColor: currentColor,
          color: "White",
          borderRadius: "10px",
        }}
        className={`text-md p-3 hover:drop-shadow-xl`}
        onClick={handleShow}
      >
        Add to Scheduler
      </button>
      <Dialog open={show} onClose={handleReset}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add to Scheduler</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="Meal"
              label="Meal"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="Description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Day of the Week
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={dayOfTheWeek}
                label="Day of the Week"
                onChange={handleDayOfWeekChange}
                required
              >
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <button
              type="submit"
              style={{
                backgroundColor: currentColor,
                color: "White",
                borderRadius: "10px",
              }}
              className={`text-md p-3 hover:drop-shadow-xl`}
            >
              Add
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default SetWeekendMealModal;
