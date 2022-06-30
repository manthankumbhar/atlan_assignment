import "./App.scss";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <div className="App__header">
        <h1 className="App__header--h1">Altan Assignment</h1>
        <a
          href="https://open-source-notion.manthankumbhar.com/shared/1f374f3f-5ae2-4715-9a24-fb3ae3bac03c"
          rel="noreferrer"
          target="_blank"
          className="App__header--btn"
        >
          README
        </a>
      </div>
      <Home />
    </div>
  );
}

export default App;
