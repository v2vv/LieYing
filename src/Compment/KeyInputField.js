import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function InputDialog() {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  };

  const Textfile = ({ dataName }) => {
    const [inputValue, setInputValue] = useState("");
    const handleSave = () => {
      localStorage.setItem(dataName, inputValue);
      setInputValue("");
    };
    return (
      <div style={styles}>
        <label>Enter {dataName} :</label>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          type="text"
          sx={{ m: 1, width: "25ch" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="outlined" onClick={handleSave}>
          Save
        </Button>
      </div>
    );
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        direction="column"
        rowSpacing={2}
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Grid item>
          <Textfile dataName="jsAPIkey" />
        </Grid>
        <Grid item>
          <Textfile dataName="webkey" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InputDialog;
