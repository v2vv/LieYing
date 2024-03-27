import logo from "./logo.svg";
import "./App.css";
import InputDialog from "./Compment/InputDialog.js";
import MapContainer from "./Compment/MapContainer.js";
import DateTimePicker from "./Compment/CommonlyUsedComponents.js";

function App() {
  function DateTimeChangeHander(text) {
    console.log(text);
  }

  return (
    <div className="App">
      <MapContainer />
      <div>
        <InputDialog dataName="jsAPIkey"></InputDialog>
        <InputDialog dataName="webkey"></InputDialog>
        <DateTimePicker DateTimeChange={DateTimeChangeHander}></DateTimePicker>
        <DateTimePicker></DateTimePicker>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
