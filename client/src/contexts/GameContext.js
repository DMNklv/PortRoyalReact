import React, { createContext, useState, useContext, useCallback } from "react";
import { cardsData } from "../data/cardsData";

const GameContext = createContext();

export function useGameContext() {
  return useContext(GameContext);
}

export function GameProvider({ children }) {
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
      return card;
    }
    return null;
  }, [currentCardIndex, deck]);

  const tradeOrHireCard = useCallback((cardId) => {}, []);
}
