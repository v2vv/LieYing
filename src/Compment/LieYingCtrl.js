import * as React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import InputDialog from "./InputDialog.js";
import DatePicker from "./DatePick.js";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

export default function LieYingCtrlUI() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Grid
            container
            direction="column"
            rowSpacing={2}
            justifyContent="space-between"
            alignItems="stretch"
          >
            <Grid item>
              <InputDialog dataName="jsAPIkey"></InputDialog>
            </Grid>
            <Grid item>
              <InputDialog dataName="webkey"></InputDialog>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <DatePicker />
        </Grid>
      </Grid>
    </Box>
  );
}
