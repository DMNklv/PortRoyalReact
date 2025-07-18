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
        
        addCardEffect: (state, action) => {
            const effect = action.payload;
            state.cardEffects.push({
                ...effect,
                id: `effect_${Math.random().toString(36).substring(2, 12)}`, // Generate a unique ID for the effect
                timestamp: Date.now()
            });
        },

        removeCardEffect: (state, action) => {
            const effectId = action.payload;
            state.cardEffects = state.cardEffects.filter(effect => effect.id !== effectId);
        },

        clearCardEffects: (state) => {
            state.cardEffects = [];
        }
        
    }
});

export const {
    loadCards,
    activateCard,
    deactivateCard,
    addCardEffect,
    removeCardEffect,
    clearCardEffects
} = cardsSlice.actions;

export default cardsSlice.reducer;
