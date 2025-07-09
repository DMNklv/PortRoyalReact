import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import playersReducer from './slices/playersSlice';
import cardsReducer from './slices/cardsSlice';
import gameMiddleware from './middleware/gameMiddleware';

export const store = configureStore({
    reducer: {
        game: gameReducer,
        players: playersReducer,
        cards: cardsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(gameMiddleware),
});