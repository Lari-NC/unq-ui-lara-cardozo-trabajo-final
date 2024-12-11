import { useState } from "react";

const ModalMode = ({ isOpen, onClose, onPlayersReady, onPlayer1, onPlayer2 }) => {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleApply = () => {
    if (player1.trim() && player2.trim()) {
      onPlayersReady(true);
      onClose();
    } else {
      setError(true);
      onPlayersReady(false);
    }
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "#00000050" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div
            className="modal-header mb-0 pb-0"
            style={{ borderBottom: "none" }}
          >
            <h5 className="modal-title">Player Names</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={() => {
                onPlayersReady(false);
                onClose();
              }}
            ></button>
          </div>
          <div className="modal-body text-left">
            <input
              className="form-control mb-2"
              type="text"
              placeholder="Player 1"
              value={player1}
              onChange={(e) => {
                setPlayer1(e.target.value);
                onPlayer1(e.target.value);
              }}
              aria-label="Player 1 name"
            />
            <input
              className="form-control mb-4"
              type="text"
              placeholder="Player 2"
              value={player2}
              onChange={(e) => {
                setPlayer2(e.target.value);
                onPlayer2(e.target.value);
              }}
              aria-label="Player 2 name"
            />
            {error && (
              <div className="text-danger mb-2">
                Please fill in both player names.
              </div>
            )}
            <div className="text-end">
              <button className="btn btn-primary" onClick={handleApply}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMode;
