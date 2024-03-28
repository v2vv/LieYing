import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputField from "./InputField.js";
import DatePicker from "./DatePick.js";

export default function LieYingCtrlUI() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={8}>
          <InputField></InputField>
        </Grid>
        <Grid item xs={8}>
          <DatePicker />
        </Grid>
      </Grid>
    </Box>
  );
}
