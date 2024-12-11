import "./App.css";
import Game from "./pages/game/Game";
import Game1vs1 from "./pages/game/Game1vs1";
import MainMenu from "./pages/mainMenu/MainMenu";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game1vs1" element={<Game1vs1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
