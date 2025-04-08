import "./App.css";
import { useDragger } from "./hooks/useDragger";

function App() {
  useDragger("box");

  return (
    <main>
      <div className="container">
        <div id="box" className="box"></div>
      </div>
    </main>
  );
}

export default App;
