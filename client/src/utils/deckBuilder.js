export const buildDeck = (cards, deckComposition, playerCount) => {
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

export const shuffleDeck = (deck) => {
  const shuffledDeck = [...deck];
  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
  }
  return shuffledDeck;
}