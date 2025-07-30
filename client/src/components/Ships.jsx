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

    return (
        <div className="shipsWrapper">
            <div className="cardsSegment">
                {shipsInHarbor.map((ship, index) => (
                    <ShipCard key={ship.instanceId} ship={ship} />
                ))}
            </div>
        </div>
    );
}

function ShipCard({ ship }) {
    const [showDetails, setShowDetails] = useState(false);
    const timeRef = useRef(null);

    const handleMouseEnter = () => {
        timeRef.current = setTimeout(() => setShowDetails(true), 500);
    }

    const handleMouseLeave = () => {
        clearTimeout(timeRef.current);
        setShowDetails(false);
    }

    return (
        <div
            className="card shipCard"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={ship.cardUrl} alt={ship.name} />
            <div
                className={`cardDetails${showDetails ? ' show' : ''}`}
            >
                {/* <h3>{ship.name}</h3> */}
                <p>{ship.desc}</p>
            </div>
        </div>
    )

}