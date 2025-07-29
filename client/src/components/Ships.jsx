import { useSelector } from 'react-redux';

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
        <>
            <div className="shipsWrapper">
                {/* <h2>Ship cards segment</h2> */}
                <div className="cardsSegment">
                    {shipsInHarbor.map((ship, index) => (
                        <div key={ship.instanceId} className="card shipCard">
                            <img src={ship.cardUrl} alt={ship.name} />
                            <div className="cardDetails">
                                <h3>{ship.name}</h3>
                                <p>{ship.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}