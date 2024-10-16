import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Homepage } from "./pages/Homepage/Homepage";
import { Hero } from "./pages/Hero/Hero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/character/:id" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
