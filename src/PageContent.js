import DeckTile from "./DeckTile.js";
import NewDeckButton from "./NewDeckButton.js";

const PageContent = ({ decks, handleNewDeck }) => {
  return (
    <div className="PageContent">
      <NewDeckButton onClick={handleNewDeck} />
      {decks.map((deck) => (
        <DeckTile key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

export default PageContent;
