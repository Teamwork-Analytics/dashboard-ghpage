import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SimulationPage from "../pages/simulation/SimulationPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TEAM_NAME } from "../data/manualLabels";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

const TOAST_LIMIT = 2; // feedback toast limit

function App() {
  const styles = {
    footer: {
      height: "30px",
      textAlign: "center" as const,
      position: "fixed" as const,
      margin: "0 auto",
      background: "#222222",
      width: "100vw",
      color: "grey",
    },
  };

  // workaround for limiting toast
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
    <div className="App">
      <Toaster
        toastOptions={{
          // Define default options
          duration: 1000,
          // Default options for specific types success
          success: {
            duration: 700,
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard-ghpage" element={<SimulationPage />} />
          <Route
            path="/visualisation/:simulationId"
            element={<SimulationPage />}
          />
          <Route path="*" element={<SimulationPage />} />
          <Route path="/" element={<SimulationPage />} />
        </Routes>
      </BrowserRouter>
      <footer style={styles.footer}>
        <small>
          by {TEAM_NAME} &copy; {new Date().getFullYear()}
        </small>
      </footer>
    </div>
  );
}

export default App;
