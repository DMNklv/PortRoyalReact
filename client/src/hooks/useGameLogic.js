import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  drawCardToHarbor,
  removeCardFromHarbor,
  nextPlayer,
  setGamePhase
} from '../store/slices/gameSlice';
import {
  addCardToPlayer,
  updatePlayerCoins,
  updatePlayerVictoryPoints
} from '../store/slices/playersSlice';

export const useGameLogic = () => {
  const dispatch = useDispatch();
  const game = useSelector(state => state.game);
  const players = useSelector(state => state.players);
  const currentPlayer = players.players[game.currentPlayerIndex];
  
  const drawCard = useCallback(() => {
    if (game.deck.length > 0) {
      dispatch(drawCardToHarbor());
    }
  }, [dispatch, game.deck.length]);
  
  const purchaseCard = useCallback((cardId, playerId) => {
    const card = game.harbor.find(c => c.id === cardId);
    const player = players.players.find(p => p.id === playerId);
    
    if (card && player && player.coins >= (card.cost || 0)) {
      // Remove card from harbor
      dispatch(removeCardFromHarbor(cardId));
      
      // Add to player's collection
      const cardType = card.type === 'ship' ? 'ship' : 
                      card.type === 'person' ? 'person' : 'building';
      dispatch(addCardToPlayer({ playerId, card, cardType }));
      
      // Pay cost
      dispatch(updatePlayerCoins({ playerId, amount: -(card.cost || 0) }));
      
      // Award victory points
      if (card.victoryPoints) {
        dispatch(updatePlayerVictoryPoints({ 
          playerId, 
          amount: card.victoryPoints 
        }));
      }
    }
  }, [dispatch, game.harbor, players.players]);
  
  const endTurn = useCallback(() => {
    dispatch(nextPlayer());
    dispatch(setGamePhase('discovery'));
  }, [dispatch]);
  
  return {
    currentPlayer,
    drawCard,
    purchaseCard,
    endTurn,
    gameState: game,
    players: players.players
  };
};