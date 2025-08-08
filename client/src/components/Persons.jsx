import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

export function Persons() {

    const gameState = useSelector(state => state.game);
    const personsInHarbor = gameState.harbor.persons || [];

    return (
        <div className="personsWrapper">
            <div className="cardsSegment">
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