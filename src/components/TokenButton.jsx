const TokenButton = ({ token, index, tokensPressed, completedTokens, onClick }) => {
  return (
    <button
      className={`position-absolute top-0 start-0 p-2 text-light ${
        tokensPressed.some((pressed) => pressed.id === token.id) ||
        completedTokens.some((pressed) => pressed.id === token.id)
          ? "hideToken w-100 h-100 bg-dark"
          : "showToken w-100 h-100 bg-dark"
      }`}
      style={{ fontSize: "2rem"}}
      onClick={() => onClick(token)}
    >
      {index}
    </button>
  );
};

export default TokenButton;
