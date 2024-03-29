import "./App.css";
import { useState } from "react";
import MapContainer from "./Compment/MapContainer.js";
import Grid from "@mui/material/Grid";
import LieYingCtrlUI from "./Compment/LieYingCtrl";
import { TimeZoneContext } from "./Compment/Context.js";
function App() {
  var now = new Date();
  const [TimeZone, setTimeZone] = useState({
    Startime: now.getTime() - 3600000,
    EndTime: now.getTime(),
  });

  return (
    <div className="App">
      <TimeZoneContext.Provider value={{ TimeZone, setTimeZone }}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <MapContainer />
          </Grid>
          <Grid item>
            <LieYingCtrlUI />
          </Grid>
        </Grid>
      </TimeZoneContext.Provider>
    </div>
  );
}

export default App;
