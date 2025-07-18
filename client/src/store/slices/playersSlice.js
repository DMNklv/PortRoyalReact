import { createSlice } from '@reduxjs/toolkit';

const createInitialPlayer = (id, name, isBot = false) => ({
    id,
    name,
    isBot,
    isConnected: true,
    hand: [],
    ships: [],
    people: [],
    buildings: [],
    coins: 3,
    victoryPoints: 0,
    influence: 0,
    swords: 0,
    anchors: 0,
    houses: 0,
    crosses: 0,
    actions: {
        canDraw: true,
        canTrade: true,
        canHire: true,
        turnEnded: false,
    },
    gameStats: {
        cardsDrawn: 0,
        shipsSunk: 0,
        peopleHired: 0,
        tradesCompleted: 0,
    }
});

const initialState = {
    players: [],
    numberOfPlayers: 0,
    currentPlayerId: null,
};

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers: {
        addPlayer: (state, action) => {
            const { name, isBot = false } = action.payload;
            if (state.players.length <= state.numberOfPlayers) {
                const newPlayer = createInitialPlayer(`player_${state.players.length + 1}`, name, isBot);
                state.players.push(newPlayer);
                if (state.players.length === 1) {
                    state.currentPlayerId = newPlayer.id; // Set the first player as current
                }
                state.numberOfPlayers = state.players.length; // Update the number of players
            }
            else {
                console.warn(`Cannot add more players than the set limit of ${state.numberOfPlayers}.`);
            }
        },
        
        removePlayer: (state, action) => {
            const playerId = action.payload;
            state.players = state.players.filter(p => p.id !== playerId);
            if (state.currentPlayerId === playerId) {
                state.currentPlayerId = state.players.length > 0 ? state.players[0].id : null;
            }
        },

        updatePlayerCoins: (state, action) => {
            const { playerId, amount } = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                player.coins = Math.max(0, player.coins + amount); // Ensure coins do not go negative
            }
        },

        updatePlayerVictoryPoints: (state, action) => {
            const { playerId, amount } = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                player.victoryPoints = Math.max(0, player.victoryPoints + amount); // Ensure VP do not go negative
            }
        },

        addCardToPlayer: (state, action) => {
            const { playerId, card, cardType = `hand` } = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                const cardWithPlayerId = { ...card, ownerId: playerId };

                switch (cardType) {
                    case 'ship':
                        player.ships.push(cardWithPlayerId);
                        break;
                    case 'person':
                        player.people.push(cardWithPlayerId);
                        break;
                    case 'building':
                        player.buildings.push(cardWithPlayerId);
                        break;
                    default:
                        player.hand.push(cardWithPlayerId);
                }
            }
        },

        removeCardFromPlayer: (state, action) => {
            const { playerId, cardId, cardType = `hand` } = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                switch (cardType) {
                    case 'ship':
                        player.ships = player.ships.filter(card => card.id !== cardId);
                        break;
                    case 'person':
                        player.people = player.people.filter(card => card.id !== cardId);
                        break;
                    case 'building':
                        player.buildings = player.buildings.filter(card => card.id !== cardId);
                        break;
                    default:
                        player.hand = player.hand.filter(card => card.id !== cardId);
                }
            }
        },

        updatePlayerActions: (state, action) => {
            const { playerId, actions } = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                player.actions = { ...player.actions, ...actions };
            }
        },
        
        resetPlayerTurn: (state, action) => {
            const playerId = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                player.actions = {
                    canDraw: true,
                    canTrade: true,
                    canHire: true,
                    turnEnded: false,
                };
            }
        },

        calculatePlayerStats: (state, action) => {
            const playerId = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                player.influence = player.people.reduce((sum, card) => sum + (card.influence || 0), 0);
                player.swords = player.ships.reduce((sum, card) => sum + (card.swords || 0), 0);
                player.anchors = player.people.reduce((sum, card) => sum + (card.anchors || 0), 0);
                player.houses = player.buildings.reduce((sum, card) => sum + (card.houses || 0), 0);
                player.crosses = player.buildings.reduce((sum, card) => sum + (card.crosses || 0), 0);
            }
        },
        
        setCurrentPlayer: (state, action) => {
            const playerId = action.payload;
            if (state.players.some(p => p.id === playerId)) {
                state.currentPlayerId = playerId;
            } else {
                console.warn(`Player with ID ${playerId} does not exist.`);
            }
        },
        
        resetPlayers: (state) => {
            state.players = [];
            state.currentPlayerId = null;
            // state.numberOfPlayers = 0;
        }
    }
});

export const {
    addPlayer,
    removePlayer,
    updatePlayerCoins,
    updatePlayerVictoryPoints,
    addCardToPlayer,
    removeCardFromPlayer,
    updatePlayerActions,
    resetPlayerTurn,
    calculatePlayerStats,
    setCurrentPlayer,
    resetPlayers
} = playersSlice.actions;

export default playersSlice.reducer;