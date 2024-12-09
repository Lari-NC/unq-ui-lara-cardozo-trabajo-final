const TokenImage = ({ token, tokensPressed, completedTokens }) => {
  return (
    <img
      src={token.img}
      alt="Pais"
      className={
        tokensPressed.some((pressed) => pressed.id === token.id) ||
        completedTokens.some((pressed) => pressed.id === token.id)
          ? "show w-100 h-100 object-fit-cover"
          : "hide w-100 h-100 object-fit-cover"
      }
    />
  );
};

export default TokenImage;
