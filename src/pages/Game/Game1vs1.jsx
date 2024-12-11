import { useLocation } from "react-router-dom";
import "./Game.css";
import { useState } from "react";
import GameGrid1vs1 from "../../components/grid/GameGrid1vs1.jsx";
import Modal2 from "../../components/modal/Modal2";
import GameHeader1vs1 from "../../components/header/GameHeader1vs1.jsx";

const Game1vs1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [finalTokens, setFinalTokens] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const location = useLocation();
  const config = location.state?.config || { height: 0, width: 0 };
  const { players } = location.state || {};

  const winner =
    player1Points > player2Points ? players.player1 : players.player2;
  const loser =
    player1Points > player2Points ? players.player2 : players.player1;
  const handleRestart = () => {
    setFinalTokens([]);
    setInitializing(true);
    setIsModalOpen(false);
    setPlayer1Points(0);
    setPlayer2Points(0);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <GameHeader1vs1 players={players} />

      <GameGrid1vs1
        config={config}
        setIsModalOpen={setIsModalOpen}
        finalTokens={finalTokens}
        setFinalTokens={setFinalTokens}
        initializing={initializing}
        setInitializing={setInitializing}
        players={[players.player1, players.player2]}
        player1Points={player1Points}
        setPlayer1Points={setPlayer1Points}
        player2Points={player2Points}
        setPlayer2Points={setPlayer2Points}
      />

      <Modal2
        isOpen={isModalOpen}
        onClose={handleRestart}
        onCloseOnly={handleCloseModal}
        winner={winner}
        loser={loser}
      />
    </div>
  );
};

export default Game1vs1;
