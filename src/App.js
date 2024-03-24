import logo from "./logo.svg";
import "./App.css";
import InputDialog from "./Compment/InputDialog.js";
import MapContainer from "./Compment/MapContainer.js";

function App() {
  return (
    <div className="App">
      <MapContainer></MapContainer>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <InputDialog></InputDialog>
        </div>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
