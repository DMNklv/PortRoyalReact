import { useState } from 'react'
import './css/App.css'
import { PlayersTop } from './PlayersTop'
import { Table } from './Table'
import { PlayersBottom } from './PlayersBottom'
import { cardsData } from './cardsData'


function buildDeck(cards, deckComposition, playerCount) {
  const deck = [];
  
  deckComposition.forEach(item => {
    // Skip cards with player count requirements that aren't met
    if (item.minPlayers && playerCount < item.minPlayers) {
      return;
    }
    
    const card = cards.find(c => c.id === item.cardId);
    
    for (let i = 0; i < item.quantity; i++) {
      deck.push({...card, instanceId: `${card.id}_${i}`});
    }
  });
  
  return deck;
}

const maxPlayerBaseDeck = buildDeck(cardsData.cards.baseGameCards, cardsData.baseDeckComposition, 5); // Includes all cards
const belowMaxPlayerBaseDeck = buildDeck(cardsData.cards.baseGameCards, cardsData.baseDeckComposition, 4);


function App() {
  const [gamePhase, setGamePhase] = useState('Discover');
  const [gameDeck, setGameDeck] = useState(maxPlayerBaseDeck);

  console.log(gameDeck);
  

  return (
    <>
      <PlayersTop />
      <Table />
      <PlayersBottom />
    </>
  )
}

export default App
