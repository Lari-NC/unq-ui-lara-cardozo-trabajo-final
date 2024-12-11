import Tokens from "../../assets/images/tokens.js";
import TokenImage from "../abToken/TokenImage.jsx";
import TokenButton from "../abToken/TokenButton.jsx";
import Modal2 from "../../components/modal/Modal2.jsx";
import { useState, useEffect } from "react";

const GameGrid1vs1 = ({ config, players }) => {
  const [tokensPressed, setTokensPressed] = useState([]);
  const [completedTokens, setCompletedTokens] = useState([]);
  const [player1Points, setPlayer1Points] = useState(0);
  const [player2Points, setPlayer2Points] = useState(0);
  const [finalTokens, setFinalTokens] = useState([]);
  const [initializing, setInitializing] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { player1 = "Player 1", player2 = "Player 2" } = players || {};
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");

  const handleClick = (token) => {
    if (
      tokensPressed.length < 2 &&
      !tokensPressed.some((tk) => tk.id === token.id)
    ) {
      setTokensPressed((prevState) => [...tokensPressed, token]);
    }
  };

  const handleRestart = () => {
    setTokensPressed([]);
    setCompletedTokens([]);
    setFinalTokens([]);
    setInitializing(true);
    setIsModalOpen(false);
    setPlayer1Points(0);
    setPlayer2Points(0);
  };

  useEffect(() => {
    if (tokensPressed.length === 2) {
      if (tokensPressed[0].value === tokensPressed[1].value) {
        setCompletedTokens((prevState) => [...prevState, ...tokensPressed]);

        if (currentPlayer === 1) {
          setPlayer1Points(player1Points + 1);
        } else {
          setPlayer2Points(player2Points + 1);
        }
      } else {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }

      setTimeout(() => {
        setTokensPressed([]);
      }, 1500);
    }
  }, [tokensPressed]);

  useEffect(() => {
    if (
      player1Points + player2Points === finalTokens.length / 2 &&
      finalTokens.length > 0
    ) {
      if (player1Points > player2Points) {
        setWinner(player1);
        setLoser(player2);
      } else {
        setWinner(player2);
        setLoser(player1);
      }
      setTimeout(() => {
        console.log(players);
        setIsModalOpen(true);
      }, 1200);
    }
  }, [completedTokens, finalTokens]);

  useEffect(() => {
    if (initializing) {
      const totalTokens = (config.height * config.width) / 2;
      let generatedTokens = Tokens.slice(0, totalTokens);
      generatedTokens.forEach((token, index) => {
        generatedTokens.push({ ...token, id: totalTokens + index });
      });

      generatedTokens = generatedTokens.sort(() => 0.5 - Math.random());

      setFinalTokens(generatedTokens);

      setInitializing(false);
    }
  }, [config, initializing]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container text-center p-4">
      <h3 className="text-light">
        Turn: Player {currentPlayer} ({currentPlayer === 1 ? player1 : player2})
      </h3>
      <div
        className="game-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${config.width}, 1fr)`,
          gap: "10px",
        }}
      >
        {finalTokens.map((token, index) => (
          <div
            key={token.id}
            className="position-relative p-0"
            style={{ height: "12rem" }}
          >
            <TokenImage
              token={token}
              tokensPressed={tokensPressed}
              completedTokens={completedTokens}
            />
            <TokenButton
              token={token}
              index={index}
              tokensPressed={tokensPressed}
              completedTokens={completedTokens}
              onClick={handleClick}
            />
          </div>
        ))}
      </div>
      <div className="mt-3">
        <p className="text-light">Player 1 Points: {player1Points}</p>
        <p className="text-light">Player 2 Points: {player2Points}</p>
      </div>

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

export default GameGrid1vs1;
