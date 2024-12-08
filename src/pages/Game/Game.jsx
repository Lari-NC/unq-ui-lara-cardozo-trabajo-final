import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Game.css";
import tokens from "/src/assets/images/tokens.js";

const Game = () => {
  const [tokensPressed, setTokensPressed] = useState([]);
  const [completedTokens, setCompletedTokens] = useState([]);
  const [finalTokens, setFinalTokens] = useState([]);
  const [points, setPoints] = useState(0);
  const location = useLocation();
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
    const totalTokens = (config.height * config.width) / 2;
    let generatedTokens = tokens.slice(0, totalTokens);
    generatedTokens.forEach((token, index) => {
      generatedTokens.push({ ...token, id: totalTokens + index });
    });
    generatedTokens = generatedTokens.sort(() => 0.5 - Math.random());

    setFinalTokens(generatedTokens);
  }, []);

  return (
    <>
      <h1 className="text-center text-dark position-sticky top-0 z-1 bg-primary-subtle p-2">
        Puntaje: {points}/{finalTokens.length / 2}
      </h1>
      <div className="container text-center p-4">
        <div className={`row row-cols-${config.width} justify-content-center`}>
          {finalTokens.map((token, index) => (
            <div
              key={token.id}
              className="position-relative p-0"
              style={{ height: "12rem" }}
            >
              <img
                src={token.img}
                alt="Pais"
                className={
                  tokensPressed.some((pressed) => pressed.id === token.id) ||
                  completedTokens.some((pressed) => pressed.id === token.id)
                    ? "show w-100 h-100 object-fit-cover"
                    : "hide w-100 h-100 object-fit-cover"
                }
              />
              <button
                className={`position-absolute top-0 start-0 p-2 ${
                  tokensPressed.some((pressed) => pressed.id === token.id) ||
                  completedTokens.some((pressed) => pressed.id === token.id)
                    ? "hide w-100 h-100 object-fit-cover"
                    : "show w-100 h-100 object-fit-cover"
                }`}
                style={{ fontSize: "2rem" }}
                onClick={() => handleClick(token)}
              >
                {index}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Game;
