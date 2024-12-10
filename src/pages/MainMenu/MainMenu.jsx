import { useState } from "react";
import { Link } from "react-router-dom";
import ModalMode from "../../components/ModalMode"

const MainMenu = () => {
const [isModalOpen, setIsModalOpen] = useState(false);

  const style = {
    fontSize: "2.5rem",
    height: "4.5rem",
    width: "18rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-3">
      <h1 className="mb-3 text-light" style={{ fontFamily: "Barrio", fontSize: "5rem" }}>
        Worldwide Memotest
      </h1>

      <span className=" text-light" style={{ fontSize: "1.5rem" }}>Slect a game mode:</span>
      
      <div className="d-grid d-md-block">
        <button className="btn btn-outline-light m-2"> 
          Solitary
        </button>

        <button className="btn btn-outline-light m-2" onClick={openModal}> 
         1 vs 1
        </button>

        {isModalOpen && (
          <ModalMode isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>

      <span className=" text-light" style={{ fontSize: "1.5rem" }}>Slect a dificulty level:</span>

      <Link
        to="/game"
        state={{ config: { height: 1, width: 2 } }}
        className="btn btn-primary"
        style={style}
      >
        Pruebas
      </Link>

      <Link
        to="/game"
        state={{ config: { height: 4, width: 4 } }}
        className="btn btn-success"
        style={style}
      >
        Easy
      </Link>
      <Link
        to="/game"
        state={{ config: { height: 6, width: 6 } }}
        className="btn btn-warning text-light"
        style={style}
      >
        Medium
      </Link>
      <Link
        to="/game"
        state={{ config: { height: 10, width: 6 } }}
        className="btn btn-danger"
        style={style}
      >
        Hard
      </Link>
    </div>
  );
};

export default MainMenu;
