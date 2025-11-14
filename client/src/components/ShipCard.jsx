import { useState, useRef } from 'react';

export function ShipCard({ ship, duplicateShipColor }) {
    const [showDescription, setShowDescription] = useState(false);
    const timeRef = useRef(null);

    const handleMouseEnter = () => {
        timeRef.current = setTimeout(() => setShowDescription(true), 500);
    }

    const handleMouseLeave = () => {
        clearTimeout(timeRef.current);
        setShowDescription(false);
    }

    return (
        <div
            className={`card shipCard${duplicateShipColor.flag && duplicateShipColor.color === ship.color ? ' duplicateColorShip' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={ship.cardUrl} alt={ship.name} />
            <div
                className={`shipCardDescription${showDescription ? ' show' : ''}`}
            >
                {/* <h3>{ship.name}</h3> */}
                <img src={ship.cardUrl} alt={ship.name} />
                {/* <p>{ship.desc}</p> */}
            </div>
        </div>
    )

}