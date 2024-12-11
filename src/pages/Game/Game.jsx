import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Game.css";
import GameHeader from "../../components/header/GameHeader.jsx";
import GameGrid from "../../components/grid/GameGrid.jsx";
import Modal from "../../components/modal/Modal";

const Game = () => {
  const [tokensPressed, setTokensPressed] = useState([]);
  const [completedTokens, setCompletedTokens] = useState([]);
  const [finalTokens, setFinalTokens] = useState([]);
  const [points, setPoints] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [initializing, setInitializing] = useState(true);
  const location = useLocation();
  const config = location.state?.config || { height: 0, width: 0 };

  const handleRestart = () => {
    setTokensPressed([]);
    setCompletedTokens([]);
    setFinalTokens([]);
    setPoints(0);
    setIsModalOpen(false);
    setInitializing(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <GameHeader points={points} finalTokens={finalTokens} />

      <GameGrid
        config={config}
        points={points}
        setPoints={setPoints}
        tokensPressed={tokensPressed}
        setTokensPressed={setTokensPressed}
        completedTokens={completedTokens}
        setCompletedTokens={setCompletedTokens}
        setIsModalOpen={setIsModalOpen}
        attempts={attempts}
        setAttempts={setAttempts}
        initializing={initializing}
        setInitializing={setInitializing}
        finalTokens={finalTokens}
        setFinalTokens={setFinalTokens}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={handleRestart}
        onCloseOnly={handleCloseModal}
        points={points}
        attempts={attempts}
      />
    </>
  );
};

export default Game;
