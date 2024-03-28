import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "@mui/material/Button";

export default function DatePicker() {
  function StartTimeChangeHander(text) {
    console.log(text);
  }
  function EndTimeChangeHander(text) {
    console.log(text);
  }
  function requestData() {
    console.log("text");
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
