const TokenImage = ({ token, tokensPressed, completedTokens }) => {
  return (
    <img
      src={token.img}
      alt="Pais"
      className={
        tokensPressed.some((pressed) => pressed.id === token.id) ||
        completedTokens.some((pressed) => pressed.id === token.id)
          ? "showToken w-100 h-100 object-fit-cover"
          : "hideToken w-100 h-100 object-fit-cover"
      }
    />
  );
};

export default TokenImage;
