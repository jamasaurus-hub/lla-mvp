import Header from './Header.js';
import SideNav from './SideNav.js';
import PageContent from './PageContent.js';
import DeckPage from './DeckPage.js';
// import Footer from './Footer.js';

import { useEffect, useState } from "react";
import { getData } from "./api/getData";
import { postData } from "./api/postData";
import { Route, Routes } from 'react-router-dom';


function App() {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const loadDecks = async () => {
      const data = await getData("/decks");
      setDecks(data);
    };

    loadDecks();
  }, []);

  const handleNewDeck = async () => {
    const newDeck = {
      name: "New Deck",
      isActive: false,
      deckState: "New",
      createdAt: new Date().toISOString()
    };

    try {
      const createdDeck = await postData("/decks", newDeck);

      setDecks(prev => [createdDeck, ...prev]);
    } catch (err) {
      console.error("Failed to create deck:", err);
    }
  };

  return (
    
      <div className="App">
        <Header />
        <div className="MainLayout">
          <SideNav />
          <Routes>
            <Route
              path="/"
              element={<PageContent decks={decks} handleNewDeck={handleNewDeck} />}
            />
            <Route path="/deck/:deckId" element={<DeckPage />} />
          </Routes>
        </div>
      </div>
  );
}

export default App;
