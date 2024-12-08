import { Link } from "react-router-dom";

const MainMenu = () => {
  const style = {
    fontSize: "2.5rem",
    height: "4.5rem",
    width: "18rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-3">
      <h1 className="mb-3 text-light" style={{ fontSize: "5rem" }}>
        Memotest
      </h1>
      <Link
        to="/game"
        state={{ config: { height: 4, width: 4 } }}
        className="btn btn-danger"
        style={style}
      >
        Easy
      </Link>
      <Link
        to="/game"
        state={{ config: { height: 6, width: 6 } }}
        className="btn btn-danger"
        style={style}
      >
        Medium
      </Link>
      <Link
        to="/game"
        state={{ config: { height: 10, width: 10 } }}
        className="btn btn-danger"
        style={style}
      >
        Hard
      </Link>
    </div>
  );
};

export default MainMenu;
