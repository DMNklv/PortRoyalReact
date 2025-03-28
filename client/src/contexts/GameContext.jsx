import React, { createContext, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { cardsData } from "../data/cardsData";

export const GameContext = createContext(null);

// export function useGameContext() {
//   return useContext(GameContext);
// }

export default function GameProvider({ children }) {

  GameProvider.propTypes = {
   children: PropTypes.node
  };
  
  const [deck, setDeck] = useState([]);
  const [harbor, setHarbor] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [playerPersonalDisplay, setPlayerPersonalDisplay] = useState([]);
  const [playerCoins, setPlayerCoins] = useState(0);
  const [turn, setTurn] = useState(null);

  const buildDeck = useCallback((cards, deckComposition, playerCount) => {
    const deck = [];

    deckComposition.forEach((item) => {
      // Skip cards with player count requirements that aren't met
      if (item.minPlayers && playerCount < item.minPlayers) {
        return;
      }

      const card = cards.find((c) => c.id === item.cardId);

      for (let i = 0; i < item.quantity; i++) {
        deck.push({ ...card, instanceId: `${card.id}_${i}` });
      }
    });

    return deck;
  }, []);

  const shuffleDeck = useCallback((deck) => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
  }, []);

  const startGame = useCallback(() => {
    const newDeck = buildDeck(
      cardsData.cards.baseGameCards,
      cardsData.baseDeckComposition,
      5
    );
    const shuffledDeck = shuffleDeck(newDeck);

    setDeck(shuffledDeck);
    setHarbor([]);
    setPlayerPersonalDisplay([]);
    setCurrentCardIndex(0);
    setPlayerCoins(3);
    setTurn(null);
  }, [buildDeck, shuffleDeck]);

  const drawToHarbor = useCallback(() => {
    if (currentCardIndex < deck.length) {
      const card = deck[currentCardIndex];
      setHarbor((prev) => [...prev, card]);
      setCurrentCardIndex((prev) => prev + 1);
      console.log(card);
      return card;
    }
    return null;
  }, [currentCardIndex, deck]);

  const tradeOrHireCard = useCallback((cardId) => {
    const cardIndex = harbor.findIndex(card => card.id === cardId);
    if (cardIndex >= 0) {
      const card = harbor[cardIndex];

      if (playerCoins >= card.cost) {
        const newHarbor = [...harbor];
        newHarbor.splice(cardIndex, 1); // Remove the card from the harbor
        setHarbor(newHarbor);

        setPlayerPersonalDisplay(prev => [...prev, card]); // Add the card to the player's personal display
        setPlayerCoins(prev => prev - card.cost); // Deduct the cost from the player's coins
      }
    }
  }, [harbor, playerCoins]);

  const endTurn = useCallback(() => {
    setHarbor([]);
  }, []);

  const gameState = {
    deck,
    harbor,
    playerPersonalDisplay,
    playerCoins,
    turn,
    cardsRemaining: deck.length - currentCardIndex,
    startGame,
    drawToHarbor,
    tradeOrHireCard,
    endTurn,
  };

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  )
}
