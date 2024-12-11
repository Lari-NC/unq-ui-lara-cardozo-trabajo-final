import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, onCloseOnly, points, attempts }) => {
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
            <h5 className="modal-title">YOU ARE THE WINNER</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onCloseOnly}
            ></button>
          </div>
          <div className="modal-body text-left">
            <p>
              You have successfully completed this level in{" "}
              <strong>{attempts}</strong> attempts and scored {points}/{points}{" "}
              points.
            </p>
            <p className="m-0">Congratulations!</p>
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

export default Modal;
