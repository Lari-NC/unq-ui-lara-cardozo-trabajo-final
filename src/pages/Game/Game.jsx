import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Game.css";
import tokens from "/src/assets/images/tokens.js";
import TokenImage from "../../components/TokenImage";
import TokenButton from "../../components/TokenButton";
import Modal from "../../components/Modal";

const Game = () => {
  const [tokensPressed, setTokensPressed] = useState([]);
  const [completedTokens, setCompletedTokens] = useState([]);
  const [finalTokens, setFinalTokens] = useState([]);
  const [points, setPoints] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false); //

  const location = useLocation();
  const config = location.state?.config || { height: 0, width: 0 };

  const initializeTokens = () => {
    const totalTokens = (config.height * config.width) / 2;
    let generatedTokens = tokens.slice(0, totalTokens);
    generatedTokens.forEach((token, index) => {
      generatedTokens.push({ ...token, id: totalTokens + index });
    });
    setFinalTokens(generatedTokens.sort(() => 0.5 - Math.random()));
  };

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
    if (tokensPressed.length == 2) {
      if (tokensPressed[0].value === tokensPressed[1].value) {
        setCompletedTokens(completedTokens.concat(tokensPressed));
        setPoints(points + 1);
      }
      setTimeout(() => {
        setTokensPressed([]);
      }, 1500);
    }
  }, [tokensPressed]);

  useEffect(() => {
    const totalTokens = (config.height * config.width) / 2;
    let generatedTokens = tokens.slice(0, totalTokens);
    generatedTokens.forEach((token, index) => {
      generatedTokens.push({ ...token, id: totalTokens + index });
    });
    generatedTokens = generatedTokens.sort(() => 0.5 - Math.random());

    setFinalTokens(generatedTokens);

    initializeTokens(); 
  }, [config]);

  useEffect(() => {
    if (
      points === (finalTokens.length / 2) &&
      finalTokens.length > 0
    ) {
      setIsModalOpen(true);
    }
  }, [completedTokens, finalTokens]);

  const handleRestart = () => {
    setTokensPressed([]);
    setCompletedTokens([]);
    setFinalTokens([]);
    setPoints(0);
    setIsModalOpen(false);
    initializeTokens();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="text-center text-dark position-sticky top-0 z-1 bg-primary-subtle p-2">
        Points: {points}/{finalTokens.length / 2}
      </h1>
      <div className="container text-center p-4">
        {/* <div className={`row row-cols-${config.width} justify-content-center`}> */}
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
      <Modal
        isOpen={isModalOpen}
        onClose={handleRestart}
        onCloseOnly={handleCloseModal}
        points={points}
      />
    </>
  );
};

export default Game;
