import { TextboxProvider } from "./context";
import { PropertiesPanel } from "./components/PropertiesPanel";
import { Toolbar } from "./components/Toolbar";
import { CanvasArea } from "./components/Canvas";
import "./App.css";

const App: React.FC = () => {
  return (
    <main className="app-layout">
      <Toolbar />
      <CanvasArea />
      <PropertiesPanel />
    </main>
  );
};

export default function AppWithProvider() {
  return (
    <TextboxProvider>
      <App />
    </TextboxProvider>
  );
}
