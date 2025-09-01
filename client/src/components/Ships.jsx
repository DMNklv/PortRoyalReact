import { useSelector } from 'react-redux';
import { useState, useRef } from 'react';

// const images = import.meta.glob('../assets/ships/*.png', { eager: true });

// function getImage(path) {
//     // path: 'ships/ship1.png'
//     const key = `../assets/${path}`;
//     return images[key]?.default;
// }

// // ...
// <img src={getImage(ship.cardUrl)} alt={ship.name} />

export function Ships() {

    const gameState = useSelector(state => state.game);
    const shipsInHarbor = gameState.harbor.ships || [];

    // const [duplicateShipColorPresent, setDuplicateShipColorPresent] = useState(false);

    return (
        <div className="shipsWrapper">
            <div className="cardsSegment">
                {shipsInHarbor.map((ship, index) => (
                    <ShipCard key={ship.instanceId} ship={ship} duplicateShipColor={gameState.duplicateShipColor}/>
                ))}
            </div>
        </div>
    );
}

function ShipCard({ ship, duplicateShipColor }) {
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