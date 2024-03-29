import "./App.css";
import MapContainer from "./Compment/MapContainer.js";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LieYingCtrlUI from "./Compment/LieYingCtrl";

function App() {
  return (
    <div className="App">
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <MapContainer />
        </Grid>
        <Grid item>
          <LieYingCtrlUI />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
