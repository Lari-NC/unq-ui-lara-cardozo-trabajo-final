import { Link } from "react-router-dom";
import GameMode from "../../components/abMode/GameMode"
import { useState } from "react";

const MainMenu = () => {
  const [selectedMode, setSelectedMode] = useState();
  const [player1, setPlayer1] = useState();
  const [player2, setPlayer2] = useState();

  const style = {
    fontSize: "2.5rem",
    height: "4.5rem",
    width: "18rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const preventClick = (e) => {
    if (!selectedMode) {
      e.preventDefault();
      alert("Selecciona un modo de juego primero.");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-3">
      <h1 className="mb-3 text-light" style={{ fontFamily: "Barrio", fontSize: "5rem" }}>
        Worldwide Memotest
      </h1>

      <GameMode onSelectedMode={setSelectedMode} onPlayer1={setPlayer1} onPlayer2={setPlayer2} />

      {/* <Link
        to={selectedMode === "1vs1" ? "/game1vs1" : "/game"}
        state={{ config: { height: 2, width: 2 }, players: { player1, player2 }, }}
        className="btn btn-primary"
        style={style}
        onClick={preventClick}
      >
        Pruebas
      </Link> */}

      <Link
        to={selectedMode === "1vs1" ? "/game1vs1" : "/game"}
        state={{ config: { height: 4, width: 4 }, players: { player1, player2 }, }}
        className="btn btn-success"
        style={style}
        onClick={preventClick}
      >
        Easy
      </Link>

      <Link
        to={selectedMode === "1vs1" ? "/game1vs1" : "/game"}
        state={{ config: { height: 6, width: 6 }, players: { player1, player2 }, }}
        className="btn btn-warning text-light"
        style={style}
        onClick={preventClick}
      >
        Medium
      </Link>
      
      <Link
        to={selectedMode === "1vs1" ? "/game1vs1" : "/game"}
        state={{ config: { height: 10, width: 6 }, players: { player1, player2 }, }}
        className="btn btn-danger"
        style={style}
        onClick={preventClick}
      >
        Hard
      </Link>
    </div>
  );
};

export default MainMenu;
