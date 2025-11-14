import { useSelector } from 'react-redux';
import { PersonCard } from './PersonCard';

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