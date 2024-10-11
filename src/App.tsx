import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import { api } from './constants';
import { Homepage } from "./pages/Homepage/Homepage";
import { Hero } from "./pages/Hero/Hero";

function App() {
  api
    .get(`/v1/public/characters`)
    .then((res) => console.log(res.data.data))
    .catch((err) => console.error(err))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path=":id" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
