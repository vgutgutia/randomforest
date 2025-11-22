import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Yaitc from "./Yaitc";

export default function App() {
  return (
    <Routes>
      {/* Homepage */}
      <Route path="/" element={<HomePage />} />

      {/* Youth AI Tech Club Page */}
      <Route path="/yaitc" element={<Yaitc />} />
    </Routes>
  );
}
