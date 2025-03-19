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

function shuffleDeck(deck) {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}

//? later change to one variable for the deck with a variable for the number of players
const baseDeckMaxPlayers = buildDeck(cardsData.cards.baseGameCards, cardsData.baseDeckComposition, 5); // Includes all cards
const baseDeckBelowMaxPlayers = buildDeck(cardsData.cards.baseGameCards, cardsData.baseDeckComposition, 4);

const shuffledDeck = shuffleDeck(baseDeckMaxPlayers);


function App() {
  const [gamePhase, setGamePhase] = useState('Discover');
  const [gameDeck, setGameDeck] = useState(shuffledDeck);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // console.log(`Ordered deck`, baseDeckMaxPlayers);
  console.log(`Shuffled deck:`, gameDeck);

  const drawCard = () => {
    if(currentCardIndex < gameDeck.length) {
      const card = gameDeck[currentCardIndex];
      setCurrentCardIndex(currentCardIndex + 1);
      console.log(card);
    }
  };
  

  return (
    <>
      <PlayersTop />
      <Table drawCard={drawCard}/>
      <PlayersBottom />
    </>
  )
}

export default App
