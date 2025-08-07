import { useSelector } from 'react-redux';
import { useState, useRef, useLayoutEffect } from 'react';

export function Persons() {

    const gameState = useSelector(state => state.game);
    const personsInHarbor = gameState.harbor.persons || [];

    const segmentRef = useRef(null);

    useLayoutEffect(() => {
        const container = segmentRef.current;
        if (!container) return;
        const cards = container.querySelectorAll('.card');
        if (cards.length < 9) {
            container.style.setProperty('--card-overlap', '0px');
            return;
        }
        const containerWidth = container.offsetWidth;
        const cardWidth = cards[0].offsetWidth;
        const n = cards.length;
        // Calculate overlap so all cards fit, clamp between -80px and -16px
        let overlap = (containerWidth - cardWidth) / (n - 1) - cardWidth;
        overlap = Math.min(-16, Math.max(overlap, -80));
        container.style.setProperty('--card-overlap', `${overlap}px`);
    }, [personsInHarbor.length]);

    return (
        <div className="personsWrapper">
            <div className="cardsSegment" ref={segmentRef} >
                {personsInHarbor.map((person, index) => (
                    <PersonCard key={person.instanceId} person={person} />
                ))}
            </div>
        </div>
    );
}

function PersonCard({ person }) {
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
            className="card personCard"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`personCardDescription${showDescription ? ' show' : ''}`} >
                {/* <h3>{person.name}</h3> */}
                <p>{person.desc}</p>
            </div>
            <img src={person.cardUrl} alt={person.name} />
        </div>
    );
}