import Tokens from "../../assets/images/tokens.js";
import TokenImage from "../abToken/TokenImage.jsx";
import TokenButton from "../abToken/TokenButton.jsx";
import { useState, useEffect } from "react";

const GameGrid1vs1 = ({
  config,
  setIsModalOpen,
  finalTokens,
  setFinalTokens,
  initializing,
  setInitializing,
  players,
  player1Points,
  setPlayer1Points,
  player2Points,
  setPlayer2Points,
}) => {
  const [tokensPressed, setTokensPressed] = useState([]);
  const [completedTokens, setCompletedTokens] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const handleClick = (token) => {
    if (
      tokensPressed.length < 2 &&
      !tokensPressed.some((tk) => tk.id === token.id)
    ) {
      setTokensPressed((prevState) => [...tokensPressed, token]);
    }
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
      setTimeout(() => {
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

  return (
    <div className="container text-center p-4">
      <h3 className="text-light">
        Turn: Player {currentPlayer} ({players[currentPlayer - 1]})
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
    </div>
  );
};

export default GameGrid1vs1;
