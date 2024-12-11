import { useLocation } from "react-router-dom";
import "./Game.css";
import GameGrid1vs1 from "../../components/grid/GameGrid1vs1.jsx";
import GameHeader1vs1 from "../../components/header/GameHeader1vs1.jsx";

const Game1vs1 = () => {
  const location = useLocation();
  const config = location.state?.config || { height: 0, width: 0 };
  const { players } = location.state || {};

  return (
    <div>
      <GameHeader1vs1 players={players} />

      <GameGrid1vs1
        config={config}
        players={{ player1: players.player1, player2: players.player2 }}
      />
    </div>
  );
};

export default Game1vs1;
