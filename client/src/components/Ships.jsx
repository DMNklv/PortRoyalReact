import { useSelector } from 'react-redux';
import { ShipCard } from './ShipCard';

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