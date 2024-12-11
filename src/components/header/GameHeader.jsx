import { useNavigate } from "react-router-dom";
import BackIcon from "../../assets/icons/back.png";

const GameHeader = ({ points, finalTokens }) => {
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

      <h1 className="m-0">
        Points: {points}/{finalTokens.length / 2}
      </h1>

      <span />
    </div>
  );
};

export default GameHeader;
