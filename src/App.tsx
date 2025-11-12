import "./App.css";
import { PixiThreeCanvas } from "./components/pixi-three-canvas";

function App() {
  return (
    <div className="m-4">
      <h1 className="text-xl">Pixi + Three example</h1>
      <ul className="list-disc ml-4">
        <li>Three.js is rendering a grey cube.</li>
        <li>Pixi.js is rendering a red square.</li>
        <li>
          Canvas container has tailwind class{" "}
          <code className="bg-gray-300">h-[30lvh] w-[30lvw]</code>
        </li>
      </ul>
      <PixiThreeCanvas className="h-[30lvh] w-[30lvw]"></PixiThreeCanvas>
    </div>
  );
}

export default App;
