import { useSelector } from 'react-redux';
import { ExpeditionCard } from './ExpeditionCard';

export function Expeditions() {

    const gameState = useSelector(state => state.game);
    const expeditionCards = gameState.expeditionCards || [];

    return (
        <>
            <div id="expeditionsWrapper">
                {/* <h2>Expeditions Space</h2> */}
                <div className="expeditionCardsSegment">
                    {expeditionCards.map((expedition, index) => (
                        <ExpeditionCard key={expedition.instanceId} expedition={expedition} />
                    ))}
                </div>
            </div>
        </>
    )
}