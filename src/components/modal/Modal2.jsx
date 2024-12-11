import { Link } from "react-router-dom";

const Modal2 = ({
  isOpen,
  onClose,
  onCloseOnly,
  winner,
  loser,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "#00000050" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{winner} IS THE WINNER</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onCloseOnly}
            ></button>
          </div>
          <div className="modal-body text-left">
            <p className="mb-0">You have successfully completed this level.</p>
            <p>Congratulations!</p>
            <p className="m-0">{loser} try better next time.</p>
          </div>
          <div className="modal-footer d-flex">
            <Link to="/" className="btn btn-secondary">
              Main Menu
            </Link>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
