import { dealCoinCardToPlayer } from "../../slices/playersSlice";
import { startGame } from "../../slices/gameSlice";

export const dealStartingCoins = () => (dispatch, getState) => {
    const state = getState();
    const players = state.players.players;
    let deck = [...state.game.deck];

    // Deal 3 coins to each player
    players.forEach(player => {
        for (let i = 0; i < 3; i++) {
            const card = deck.shift();
            dispatch(dealCoinCardToPlayer({ playerId: player.id, card}));
        }
    });

    // Update the deck in the game state
    dispatch({
        type: 'game/setDeck',
        payload: deck
    });
}