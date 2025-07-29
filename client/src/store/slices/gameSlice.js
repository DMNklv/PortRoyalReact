import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { buildDeck, shuffleDeck } from '../../utils/deckBuilder';
import cardsData from '../../data/cardsData';

export const GAME_PHASES = {
    SETUP: 'setup',
    DISCOVERY: 'discovery',
    TRADE_HIRE: 'trade_hire',
    END_TURN: 'end_turn',
    GAME_OVER: 'game_over'
};

const initialState = {
    gameId: null,
    phase: GAME_PHASES.SETUP,
    currentPlayerIndex: 0,
    round: 1,
    harbor: {ships: [], persons: []},
    deck: [],
    discardPile: [],
    expeditionCards: [],
    gameSettings: {
        numberOfPlayers: 5,
        victoryPointsToWin: 12,
        expeditionRequiredToWin: false, // A player needs to have an expedition to be eligible to win. The game end is only triggered if a player has both the required number of victory points and an expedition. Players with expeditions rank higher than players without expeditions
        hiddenDiscardedCards: true,
        passAutomatically: true, // For a non-active player, the trade_hire phase is skipped automatically if the only card the player could take would be a ship that earns him no coin (considering the 1 coin he pays to the active player)
        justOneMoreContract: false, // The game with the "Just One More Contract" expansion
    },
    gameStarted: false,
    winner: null,
    isLoading: false,
    error: null
};

// export const startGame = createAsyncThunk(
//     'game/startGame',
//     async (gameSettings) => {
//         const deck = buildDeck(initialState.gameSettings.justOneMoreContract ? cardsData.cards.justOneMoreContractCards : cardsData.cards.baseGameCards, cardsData.baseDeckComposition, initialState.gameSettings.numberOfPlayers);
//         const shuffledDeck = shuffleDeck(deck);
        
//         return {
//             deck: shuffledDeck,
//             gameSettings
//         };
//     }
// );

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startGame: (state, action) => {
            const gameSettings = action.payload;
            
            console.log('🎮 Starting game with settings:', gameSettings);
            
            try {
                const deck = shuffleDeck(buildDeck(
                    gameSettings.justOneMoreContract ? cardsData.cards.justOneMoreContractCards : cardsData.cards.baseGameCards, cardsData.baseDeckComposition, gameSettings.numberOfPlayers
                ));

                console.log('🃏 Deck built and shuffled:', deck);
                
                state.deck = deck;
                state.gameSettings = { ...state.gameSettings, ...gameSettings };
                state.gameStarted = true;
                state.phase = GAME_PHASES.DISCOVERY;
                state.gameId = `game_${Date.now()}`;
                state.error = null;
                
                console.log('✅ Game started successfully!');
            } catch (error) {
                console.error('❌ Error starting game:', error);
                state.error = error.message;
            }
        },

        setGamePhase: (state, action) => {
            state.phase = action.payload;
        },

        nextPlayer: (state) => {
            const playerCount = state.gameSettings.numberOfPlayers;
            state.currentPlayerIndex = (state.currentPlayerIndex + 1) % playerCount;

            // If the next player is the first player, increment the round
            if (state.currentPlayerIndex === 0) {
                state.round += 1; 
            }
        },
        
        drawCardToHarbor: (state) => {
            if (state.deck.length > 0) {
                const card = state.deck.shift();
                console.log(`Drawn card: ${card.name} (ID: ${card.id})`);
                
                switch (card.type) {
                    case 'ship':
                        state.harbor.ships.push({
                            ...card,
                            instanceId: `ships_harbor_${card.id}_${state.harbor.ships.length}`, // Ensure unique instance ID
                            position: state.harbor.ships.length
                        });
                        break;
                    case 'person':
                        state.harbor.persons.push({
                            ...card,
                            instanceId: `persons_harbor_${card.id}_${state.harbor.persons.length}`, // Ensure unique instance ID
                            position: state.harbor.persons.length
                        });
                        break;
                    case 'expedition':
                        state.expeditionCards.push({
                            ...card,
                            instanceId: `expedition_board_${card.id}_${state.expeditionCards.length}`, // Ensure unique instance ID
                            position: state.expeditionCards.length
                        });
                        break;
                    case 'taxIncrease':
                        console.log(`Tax Increase card drawn: ${card.name}`);
                        // Handle tax increase logic here if needed
                        break;
                }
            }
        },

        removeCardFromHarbor: (state, action) => {
            const cardId = action.payload;
            state.harbor = state.harbor.filter(card => card.id !== cardId);

            state.harbor.forEach((card, index) => {
                card.position = index; // Update positions after removal
            });
        },

        //discardCard: ...

        reshuffleDeck: (state) => {
            if (state.deck.length === 0 && state.discardPile.length > 0) {
                state.deck = shuffleDeck([...state.discardPile]);
                state.discardPile = [];
            }
        },

        setWinner: (state, action) => {
            state.winner = action.payload;
            state.phase = GAME_PHASES.GAME_OVER;
        },

        resetGame: (state) => {
            return { ...initialState };
        },

        // extraReducers: (builder) => {
        //     builder
        //         .addCase(startGame.pending, (state) => {
        //             state.isLoading = true;
        //             state.error = null;
        //         })
        //         .addCase(startGame.fulfilled, (state, action) => {
        //             state.isLoading = false;
        //             state.deck = action.payload.deck;
        //             state.gameSettings = { ...state.gameSettings, ...action.payload.gameSettings };
        //             state.gameStarted = true;
        //             state.phase = GAME_PHASES.DISCOVERY;
        //             state.gameId = `game_${Date.now()}`;
        //         })
        //         .addCase(startGame.rejected, (state, action) => {
        //             state.isLoading = false;
        //             state.error = action.error.message;
        //             console.log('smth went wrong while starting the game:', action.error.message);
        //             console.log(cardsData.cards.baseGameCards)
        //         });
        // }

    }
});

export const {
    startGame,
    setGamePhase,
    nextPlayer,
    drawCardToHarbor,
    removeCardFromHarbor,
    reshuffleDeck,
    setWinner,
    resetGame
} = gameSlice.actions;

export default gameSlice.reducer;