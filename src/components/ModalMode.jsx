const ModalMode = ({ isOpen, onClose }) => {
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
          <div className="modal-header mb-0 pb-0" style={{ borderBottom: "none" }}>
            <h5 className="modal-title">Player Names</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Cerrar"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body text-left">
            <input class="form-control mb-2" type="text" placeholder="Player 1" aria-label="Player 1 name" />
            <input class="form-control mb-4" type="text" placeholder="Player 2" aria-label="Player 2 name" />

            <div className="text-end">
              <button className="btn btn-primary" onClick={onClose}>
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
