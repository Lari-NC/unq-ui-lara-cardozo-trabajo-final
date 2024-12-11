import { useState, useEffect } from "react";
import ModalMode from "./ModalMode";

const GameMode = ({ onSelectedMode, onPlayer1, onPlayer2 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedButton, setSelectedButton] = useState();
  const [playersReady, setPlayersReady] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedButton();
    onSelectedMode();
  };

  useEffect(() => {
    if (playersReady) {
      setSelectedButton("1vs1");
      onSelectedMode("1vs1");
    } else if (selectedButton === "1vs1") {
      setSelectedButton();
      onSelectedMode();
    }
  }, [playersReady]);

  const handleSelect = (button) => {
    if (button === "1vs1") {
      openModal();
    }
    setSelectedButton(button);
    onSelectedMode(button);
  };

  return (
    <>
      <span className="text-light" style={{ fontSize: "1.5rem" }}>
        Select a game mode:
      </span>

      <div className="d-grid d-md-block">
        <button
          className={`btn ${
            selectedButton === "Solitary"
              ? "btn-light m-2 btn-selected"
              : "btn-outline-light m-2"
          }`}
          onClick={() => handleSelect("Solitary")}
        >
          Solitary
        </button>

        <button
          className={`btn ${
            selectedButton === "1vs1"
              ? "btn-light m-2 btn-selected"
              : "btn-outline-light m-2"
          }`}
          onClick={() => handleSelect("1vs1")}
        >
          1 vs 1
        </button>
      </div>

      {isModalOpen && (
        <ModalMode
          isOpen={isModalOpen}
          onClose={closeModal}
          onPlayersReady={setPlayersReady}
          onPlayer1={onPlayer1}
          onPlayer2={onPlayer2}
        />
      )}

      <span className="text-light" style={{ fontSize: "1.5rem" }}>
        Select a difficulty level:
      </span>
    </>
  );
};

export default GameMode;
