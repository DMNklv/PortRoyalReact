import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

export function Expeditions() {

    const gameState = useSelector(state => state.game);
    const expeditionCards = gameState.expeditionCards || [];

    return (
        <>
            <div id="expeditionsWrapper">
                {/* <h2>Expeditions Space</h2> */}
                <div className="expeditionCardsSegment">
                    {expeditionCards.map((expedition, index) => (
                        <ExpeditionCard key={expedition.instanceId} expedition={expedition} />
                    ))}
                </div>
            </div>
        </>
    )
}

function ExpeditionCard({ expedition }) {
    const [showDescription, setShowDescription] = useState(false);
    const timerRef = useRef(null);

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => setShowDescription(true), 500);
    };

    const handleMouseLeave = () => {
        clearTimeout(timerRef.current);
        setShowDescription(false);
    };

    return (
        <div
            className="card expeditionCard"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={expedition.cardUrl} alt={expedition.name} />
            <div className={`cardDescription${showDescription ? ' show' : ''}`}>
                <p>{expedition.desc}</p>
            </div>
        </div>
    );
}