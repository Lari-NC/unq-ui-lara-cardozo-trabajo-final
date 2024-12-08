import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <>
      <div>
        <h1>Titulo</h1>
        <Link to="/game" className="btn btn-danger">Jugar</Link>
      </div>
    </>
  );
};

export default MainMenu;
