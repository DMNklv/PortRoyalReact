import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

const initialState = {
    availableCards: [], // All cards from cardsData.js
    activeCards: [], // Cards currently in play
    cardEffects: [], // Active card effects
    lastPlayedCard: null,
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        loadCards: (state, action) => {
            state.availableCards = action.payload;
        },

        activateCard: (state, action) => {
            const card = action.payload;
            state.activeCards.push(card);
            state.lastPlayedCard = card;
        },

        deactivateCard: (state, action) => {
            const cardId = action.payload;
            state.activeCards = state.activeCards.filter(card => card.id !== cardId);
            if (state.lastPlayedCard && state.lastPlayedCard.id === cardId) {
                state.lastPlayedCard = null; // Clear last played card if it was deactivated
            }
        },

        
    }
})
