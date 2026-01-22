
const NewDeckButton = ({ onClick }) => {
  return (
    <div className="NewDeckButton" onClick={onClick}>
      <p>+ New Deck</p>
    </div>
  );
};

export default NewDeckButton;