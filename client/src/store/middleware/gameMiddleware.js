import { 
  drawCardToHarbor, 
  nextPlayer, 
  setWinner, 
  reshuffleDeck 
} from '../slices/gameSlice';
import { 
  calculatePlayerStats, 
  setCurrentPlayer, 
  resetPlayerTurn 
} from '../slices/playersSlice';

const gameMiddleware = store => next => action => {
    const result = next(action);
    const state = store.getState();

    if (action.type.includes('addCardToPlayer') || action.type.includes('removeCardFromPlayer')) {
        const playerId = action.payload.playerId;
        const player = state.players.players.find(p => p.id === playerId);
        
        if (player) {
            store.dispatch(calculatePlayerStats(playerId));
        }
    }

    // Check for victory conditions
    if (action.type.includes('updatePlayerVictoryPoints')) {
        const { playerId } = action.payload;
        const player = state.players.players.find(p => p.id === playerId);
        if (player && player.victoryPoints >= state.game.gameSettings.victoryPointsToWin) {
            store.dispatch(setWinner(playerId));
        }
    }

    // Handle turn transitions
    if (action.type === 'game/nextPlayer') {
        const currentPlayerIndex = state.game.currentPlayerIndex;
        const playerCount = state.players.players.length;

        // Reset the current player's turn
        store.dispatch(resetPlayerTurn(currentPlayerIndex));

        // Set the next player as current
        store.dispatch(setCurrentPlayer((currentPlayerIndex + 1) % playerCount));
    }

    // Auto-reshuffle deck when needed
    if (action.type === 'game/drawCardToHarbor' && state.game.deck.length === 0) {
        store.dispatch(reshuffleDeck());
    }

    return result;
};

export default gameMiddleware;