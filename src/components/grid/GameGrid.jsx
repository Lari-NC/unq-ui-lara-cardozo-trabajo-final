import Tokens from "../../assets/images/tokens.js";
import TokenImage from "../abToken/TokenImage.jsx";
import TokenButton from "../abToken/TokenButton.jsx";
import { useEffect } from "react";

const GameGrid = ({
  config,
  points,
  setPoints,
  tokensPressed,
  setTokensPressed,
  completedTokens,
  setCompletedTokens,
  setIsModalOpen,
  attempts,
  setAttempts,
  initializing,
  setInitializing,
  finalTokens,
  setFinalTokens,
}) => {
  const handleClick = (token) => {
    if (
      tokensPressed.length < 2 &&
      !tokensPressed.some((tk) => tk.id === token.id)
    ) {
      setTokensPressed((prevState) => {
        const updatedTokensPressed = [...tokensPressed];
        updatedTokensPressed.push(token);
        return updatedTokensPressed;
      });
    }
  };

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

  useEffect(() => {
    if (points === finalTokens.length / 2 && finalTokens.length > 0) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 1200);
    }
  }, [completedTokens, finalTokens]);

  useEffect(() => {
    if (tokensPressed.length == 2) {
      if (tokensPressed[0].value === tokensPressed[1].value) {
        setCompletedTokens(completedTokens.concat(tokensPressed));
        setPoints(points + 1);
      }
      setAttempts(attempts + 1);
      setTimeout(() => {
        setTokensPressed([]);
      }, 1500);
    }
  }, [tokensPressed]);

  return (
    <div className="container text-center p-4">
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
    </div>
  );
};

export default GameGrid;
