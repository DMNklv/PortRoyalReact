import cardBack from '../assets/general/cardback.png'
import React, { useState, useEffect, useRef } from 'react';
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

    const [isNoDraw, setIsNoDraw] = useState(gameState.phase !== GAME_PHASES.DISCOVERY);

    // Tooltip state
    const [deckToolTipContent, setDeckToolTipContent] = useState('');
    const [showTooltip, setShowTooltip] = useState(false);
    const hoverTimer = useRef(null);

    useEffect(() => {
        console.log('⏭️ Game phase changed:', gameState.phase);
        setIsNoDraw(gameState.phase !== GAME_PHASES.DISCOVERY);
        if (gameState.phase === GAME_PHASES.DISCOVERY) {
            setDeckToolTipContent('Click to draw a card to the harbor.');
        } else {
            setDeckToolTipContent('Cannot draw a card outside of the DISCOVERY phase.');
        }
    }, [gameState.phase]);

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
    };

    const handleDeckMouseEnter = () => {
        if (isNoDraw) {
            hoverTimer.current = setTimeout(() => setShowTooltip(true), 500);
        }
    };

    const handleDeckMouseLeave = () => {
        clearTimeout(hoverTimer.current);
        setShowTooltip(false);
    };

    return (
        <>
            <div id="deckAndDiscardPileWrapper">
                {gameState.discardPile.length === 0 ? (
                    <div className='discardPile discardPileOutline' title='Discard Pile'>
                    </div>
                ) : (
                    <img src={cardBack} alt="" className="discardPile cardSideways card" title='Discard Pile' />
                )}
                <div className="deckWrapper">
                    <img src={cardBack} alt="" className={`deck card${isNoDraw ? ' noDraw' : ''}`} onClick={handleDrawToHarbor} onMouseEnter={handleDeckMouseEnter} onMouseLeave={handleDeckMouseLeave} />
                    <div className="deckCount" title='Remaining Cards in Deck'>
                        <p>{gameState.deck.length}</p>
                    </div>
                    <div className={`deckTooltip${showTooltip && isNoDraw ? ' show' : ''}`}>
                        <p>{deckToolTipContent}</p>
                    </div>
                    
                </div>
            </div>
        </>
    )
}