import { useState, useRef } from 'react';

export function ExpeditionCard({ expedition }) {
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
            <div className={`expeditionCardDescription${showDescription ? ' show' : ''}`}>
                <p>{expedition.desc}</p>
            </div>
        </div>
    );
}