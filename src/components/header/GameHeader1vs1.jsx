import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/icons/back.png";

const GameHeader1vs1 = ({ players }) => {
  const navigate = useNavigate();

  const handleGoToMainMenu = () => {
    navigate("/");
  };

  return (
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

      <h1 className="m-0">Player 1: {players.player1}</h1>
      <h1 className="m-0">Player 2: {players.player2}</h1>
      <span />
    </div>
  );
};

export default GameHeader1vs1;
