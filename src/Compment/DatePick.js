import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";
import { TimeZoneContext } from "./Context";

export default function DatePicker() {
  const { setTimeZone } = useContext(TimeZoneContext);
  var Startime = null;
  var EndTime = null;

  function StartTimeChangeHander(text) {
    Startime = text.unix() * 1000;
    console.log(`Startime ${text.toString()}`);
  }
  function EndTimeChangeHander(text) {
    EndTime = text.unix() * 1000;
    console.log(`EndTime ${text.toString()}`);
  }
  function requestData() {
    setTimeZone({ Startime, EndTime });
    console.log({ Startime, EndTime });
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
                label="StartTime"
                onAccept={StartTimeChangeHander}
              ></DateTimePicker>
            </Grid>
            <Grid item>
              <DateTimePicker
                label="EndTime"
                onAccept={EndTimeChangeHander}
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
