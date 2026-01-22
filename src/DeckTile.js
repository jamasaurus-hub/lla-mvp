import { formatDeck } from './utils/formatDeck';
import { useNavigate } from 'react-router-dom';

const DeckTile = ({ deck }) => {
    const navigate = useNavigate();
    const formatted = formatDeck(deck);

    const handleClick = () => {
        navigate(`/deck/${deck.id}`);
    };

    return (
        <div className="DeckTile" onClick={handleClick}>
        <h3>{formatted.name}</h3>
        <p>{formatted.deckState}</p>
        <p>{formatted.isActive ? "Active" : ""}</p>
        {/* <p>Created: {formatted.createdAt}</p> */}
        </div>
    );
};

export default DeckTile;
