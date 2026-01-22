import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getData } from "./api/getData"; 
import { postData } from "./api/postData"; 
import { FaPlus, FaArrowRight, FaSave } from "react-icons/fa";

const DeckPage = () => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [deckTitle, setDeckTitle] = useState("");
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const deckData = await getData(`/decks/${deckId}`);
        const cardsData = await getData(`/cards?deckId=${deckId}`);
        setDeck(deckData);
        setDeckTitle(deckData.name);
        setCards(cardsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDeck();
  }, [deckId]);

  // Update deck title locally and mark as edited
  const handleTitleChange = (e) => {
    setDeckTitle(e.target.value);
    setEdited(true);
  };

  // Update card locally
  const handleCardChange = (id, field, value) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
    setEdited(true);
  };

  // Add empty card
  const handleAddCard = () => {
    const newCard = {
      id: Date.now().toString(),
      deckId: parseInt(deckId),
      term: "",
      definition: "",
      context: "",
      contextDefinition: "",
      sourceUrl: "",
      createdAt: new Date().toISOString()
    };
    setCards(prev => [...prev, newCard]);
    setEdited(true);
  };

  // Save deck and cards
  const handleSave = async () => {
    try {
      await postData(`/decks/${deckId}`, { ...deck, name: deckTitle });
      for (let card of cards) {
        await postData(`/cards/${card.id}`, card); // MVP: assumes postData handles create/update
      }
      setEdited(false);
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  if (!deck) return <p>Loading deck...</p>;

  return (
    <div className="DeckPage">
      {/* Deck Title */}
      <div className="DeckTitle">
        <input 
          type="text" 
          value={deckTitle} 
          onChange={handleTitleChange} 
          className="DeckTitleInput"
        />
      </div>

      {/* Button Panel */}
      {edited && (
        <div className="ButtonPanel">
          <button className="SaveButton" onClick={handleSave}>
            <FaSave /> Save
          </button>
        </div>
      )}

      {/* Term Window */}
      <div className="TermWindow">
        {cards.map((card) => (
          <div key={card.id} className="CardRow">
            <input
              type="text"
              value={card.term}
              onChange={(e) => handleCardChange(card.id, "term", e.target.value)}
              className="CardInput TermInput"
              placeholder="Term"
            />
            <FaArrowRight className="ArrowIcon"/>
            <input
              type="text"
              value={card.definition}
              onChange={(e) => handleCardChange(card.id, "definition", e.target.value)}
              className="CardInput DefinitionInput"
              placeholder="Definition"
            />
          </div>
        ))}

        {/* Add new card button */}
        <div className="AddCard" onClick={handleAddCard}>
          <FaPlus /> Add Card
        </div>
      </div>
    </div>
  );
};

export default DeckPage;
