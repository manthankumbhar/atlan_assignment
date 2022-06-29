import "./App.scss";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <h1 className="App__header--h1">Altan Assignment</h1>
        <div>
          <a href="/" target="_blank" className="App__header--btn">
            Small doc on my journey
          </a>
          <a href="/" target="_blank" className="App__header--btn">
            Check loom demo
          </a>
        </div>
      </div>
      <Home />
    </div>
  );
}

export default App;
