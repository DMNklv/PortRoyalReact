import { createSlice } from '@reduxjs/toolkit';

const createPlayer = (id, name, isBot = false) => ({
    id,
    name,
    isBot,
    isConnected: true,
    ships: [],
    persons: [],
    expeditions: [],
    coins: 0,
    coinCards: [],
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
        personsHired: 0,
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
                const newPlayer = createPlayer(`player_${state.players.length + 1}`, name, isBot);
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

        dealCoinCardToPlayer: (state, action) => {
            const { playerId, card } = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                player.coins += 1;
                
                //? Track which cards are held as coins
                player.coinCards.push(card);
                // console.log(`Dealt coin card to player ${player.name}: ${card.name}`);
                console.log(`Player ${player.name} now has the following cards as coins: `, JSON.parse(JSON.stringify(player.coinCards)));
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
            const { playerId, card, cardType } = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                const cardWithPlayerId = { ...card, ownerId: playerId };

                switch (cardType) {
                    case 'ship':
                        cardWithPlayerId.instance = player.ships.filter(c => c.id === card.id).length + 1; // Track instances of the same ship
                        player.ships.push(cardWithPlayerId);
                        player.coins += card.coins || 0;
                        break;
                    case 'person':
                        cardWithPlayerId.instance = player.persons.filter(c => c.id === card.id).length + 1; // Track instances of the same person
                        player.persons.push(cardWithPlayerId);
                        break;
                    case 'expedition':
                        player.expeditions.push(cardWithPlayerId);
                        break;
                }
            }
        },

        removeCardFromPlayer: (state, action) => {
            const { playerId, cardId, cardType } = action.payload;
            const player = state.players.find(p => p.id === playerId);
            if (player) {
                switch (cardType) {
                    case 'ship':
                        player.ships = player.ships.filter(card => card.id !== cardId);
                        break;
                    case 'person':
                        player.persons = player.persons.filter(card => card.id !== cardId);
                        break;
                    case 'expedition':
                        player.expeditions = player.expeditions.filter(card => card.id !== cardId);
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
                player.influence = player.persons.reduce((sum, card) => sum + (card.influence || 0), 0);
                player.swords = player.ships.reduce((sum, card) => sum + (card.swords || 0), 0);
                player.anchors = player.persons.reduce((sum, card) => sum + (card.anchors || 0), 0);
                player.houses = player.expeditions.reduce((sum, card) => sum + (card.houses || 0), 0);
                player.crosses = player.expeditions.reduce((sum, card) => sum + (card.crosses || 0), 0);
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
    dealCoinCardToPlayer,
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