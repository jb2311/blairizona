import "./App.css";
import React, { useEffect, useState } from "react";
import { fetchBookedDates, submitDates } from "./api";
import Button from "@mui/material/Button";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Login from "./Login";
import useToken from "./useToken";

function App() {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [disabledDates, setDisabledDates] = useState();

  const selectionRange = {
    startDate: selectedStartDate,
    endDate: selectedEndDate,
    key: "selection",
  };

  const { token, setToken } = useToken();

  useEffect(() => {
    if (token) {
      const fetchDisabledDates = async () => {
        const bookedDates = await fetchBookedDates(token);
        setDisabledDates(bookedDates);
      };
      fetchDisabledDates();
    }
  }, [token]);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <div className="App">
        <DateRangePicker
          ranges={[selectionRange]}
          disabledDates={disabledDates}
          minDate={new Date()}
          onChange={({ selection }) => {
            const { startDate, endDate } = selection;
            setSelectedStartDate(startDate);
            setSelectedEndDate(endDate);
          }}
        />
      </div>
      <div>
        <Button
          varient="contained"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => submitDates(selectionRange, token)}
        >
          Book your stay!
        </Button>
      </div>
    </>
  );
}

export default App;
