import { useSelector } from 'react-redux';

export function Persons() {

    const gameState = useSelector(state => state.game);
    const personsInHarbor = gameState.harbor.persons || [];

    return (
        <>
            <div className="personsWrapper">
                {/* <h2>Person cards segment</h2> */}
                <div className="cardsSegment">
                    {personsInHarbor.map((person, index) => (
                        <div key={person.instanceId} className="card personCard">
                            <img src={person.cardUrl} alt={person.name} />
                            <div className="cardDetails">
                                <h3>{person.name}</h3>
                                <p>{person.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}