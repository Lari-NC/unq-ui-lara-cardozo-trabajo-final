import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Game = () => {
  const [tokenPressed, setTokenPressed] = useState();
  const [finalTokens, setFinalTokens] = useState([]);
  const [points, setPoints] = useState(0);
  const location = useLocation();
  const config = location.state?.config || { height: 0, width: 0 };

  const handleClick = (token) => {
    setTokenPressed(token);
  };

  const tokens = [
    { id: 0, value: "0" },
    { id: 1, value: "1" },
    { id: 2, value: "2" },
    { id: 3, value: "3" },
    { id: 4, value: "4" },
    { id: 5, value: "5" },
    { id: 6, value: "6" },
    { id: 7, value: "7" },
  ];

  useEffect(() => {
    const totalTokens = (config.height * config.width) / 2;
    let generatedTokens = tokens.slice(0, totalTokens);
    generatedTokens = generatedTokens.concat(generatedTokens);
    generatedTokens = generatedTokens.sort(() => 0.5 - Math.random());

    setFinalTokens(generatedTokens);
  }, []);

  return (
    <>
      <h1 className="text-center text-light">Puntaje: {points}</h1>
      <div className="container text-center">
        <div className={`row row-cols-${config.width} justify-content-center`}>
          {finalTokens.map((token, index) => (
            <button
              key={index}
              className={
                tokenPressed?.id === finalTokens[index].id ? "border" : ""
              }
              style={{ height: "12rem" }}
              onClick={() => handleClick(token)}
            >
              {token.value}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Game;
