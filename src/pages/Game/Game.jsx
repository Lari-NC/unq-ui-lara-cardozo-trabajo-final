import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Game.css";
import Tokens from "../../assets/images/tokens.js";
import TokenImage from "../../components/TokenImage";
import TokenButton from "../../components/TokenButton";
import Modal from "../../components/Modal";
import BackIcon from "../../assets/icons/back.png";

const Game = () => {
  const [tokensPressed, setTokensPressed] = useState([]);
  const [completedTokens, setCompletedTokens] = useState([]);
  const [finalTokens, setFinalTokens] = useState([]);
  const [points, setPoints] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config || { height: 0, width: 0 };

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

  const handleGoToMainMenu = () => {
    navigate("/"); 
  };

  return (
    <>
      <div className="d-flex align-items-center text-dark position-sticky top-0 z-1 bg-primary-subtle p-2 justify-content-between">
        <button className="btn p-0" onClick={handleGoToMainMenu}>
          <img
            src={BackIcon}
            alt="Go Back"
            style={{
              width: "3rem",
              height: "3rem",
              objectFit: "contain",
            }}
          />
        </button>

        <h1 className="m-0">
          Points: {points}/{finalTokens.length / 2}
        </h1>

        <span />
      </div>

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
