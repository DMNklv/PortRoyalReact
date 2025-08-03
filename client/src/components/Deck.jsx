import cardBack from '../assets/general/cardback.png'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawCardToHarbor, setGamePhase } from '../store/slices/gameSlice';
import { GAME_PHASES } from '../store/slices/gameSlice';

export function Deck() {

    const dispatch = useDispatch();
    const gameState = useSelector(state => state.game);
    const playersState = useSelector(state => state.players);

    // useEffect(() => {
    //     console.log('Harbor state updated:', gameState.harbor);
    // }, [gameState.harbor]);

    // useEffect(() => {
    //     console.log('Expedition cards state updated:', gameState.expeditionCards);
    // }, [gameState.expeditionCards]);

    // useEffect(() => {
    //     console.log('Deck state updated:', gameState.deck);
    // }, [gameState.deck]);

    const handleDrawToHarbor = () => {
        if (gameState.deck.length === 0) {
            console.warn('Deck is empty, cannot draw a card.');
            return;
        } else {
            if (gameState.phase !== GAME_PHASES.DISCOVERY) {
                console.warn('Cannot draw a card outside of the DISCOVERY phase.');
                return;
            }
            dispatch(drawCardToHarbor());

            
        }
    }

    return (
        <>
            <div id="deckWrapper">
                {gameState.discardPile.length == 0 ? (
                    <div className='discardPile discardPileOutline'>
                    </div>
                ) : (
                    <img src={cardBack} alt="" className="discardPile cardSideways card" />
                )}
                <div className="deckCards">
                    <img src={cardBack} alt="" className="deck card" onClick={() => {handleDrawToHarbor()}} />
                </div>
            </div>
        </>
    )
}