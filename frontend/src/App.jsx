import { Routes, Route } from "react-router-dom";
import Dashboard from "./app/pages/Dashboard";
import Quiz from "./app/pages/Quiz";
import Results from "./app/pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default App;