
export const formatDeck = (deck) => {
  const formattedState = deck.deckState
    .split("_")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  const formattedDate = new Date(deck.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  return {
    ...deck,
    deckState: formattedState,
    createdAt: formattedDate
  };
};
