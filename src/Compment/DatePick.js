import * as React from "react";
import { useContext, useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import { TimeZoneContext } from "./Context";
import dayjs from "dayjs";

export default function DatePicker() {
  const { TimeZone, setTimeZone } = useContext(TimeZoneContext);
  const starTime = useRef(null);
  const endTime = useRef(null);
  // var Startime = null;
  // var EndTime = null;

  // function StartTimeChangeHander(text) {
  //   // Startime = text.unix() * 1000;
  //   console.log(text);
  // }
  // function EndTimeChangeHander(text) {
  //   EndTime = text.unix() * 1000;
  //   console.log(`EndTime ${text.toString()}`);
  // }
  function requestData() {
    // console.log("starTime.current.value");
    // console.log(starTime.current);

    const Startime = Date.parse(starTime.current.value);
    const EndTime = Date.parse(endTime.current.value);
    console.log({ Startime, EndTime });
    setTimeZone({ Startime, EndTime });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container columnSpacing={2}>
        <Grid item>
          <Grid
            container
            direction="column"
            rowSpacing={2}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item>
              <DateTimePicker
                inputRef={starTime}
                label="StartTime"
                defaultValue={dayjs(TimeZone.Startime)}
                // onAccept={StartTimeChangeHander}
              ></DateTimePicker>
            </Grid>
            <Grid item>
              <DateTimePicker
                inputRef={endTime}
                label="EndTime"
                defaultValue={dayjs(TimeZone.EndTime)}
                // onAccept={EndTimeChangeHander}
              ></DateTimePicker>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            rowSpacing={2}
            justifyContent="center"
            alignItems="center"
            style={{ height: "100%" }}
          >
            <Grid item>
              <Button variant="outlined" onClick={requestData}>
                确认
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
