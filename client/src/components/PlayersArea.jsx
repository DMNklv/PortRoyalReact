import { useSelector } from 'react-redux';
import { Player } from './Player';
import '../css/PlayersArea.css'

export function PlayersArea() {

    const gameState = useSelector(state => state.game);
    const playerState = useSelector(state => state.players);
    const players = playerState.players;

    return (
        <>
            <div id="playersAndGameInfoWrapper">
                <div className='playersWrapper'>
                    {players.map((player, index) => (
                        <Player key={player.id} player={player} />
                    ))}
                </div>
                <div id='gameInfo'>
                    <div className='phaseInfo'>{gameState.phase} Phase</div>
                    <div className='gameInfoMetric'>Active player: {playerState.currentPlayersIds.currentActivePlayer}</div>
                    {playerState.currentPlayersIds.currentHiringPlayer && (
                        <div className='gameInfoMetric'>Current Hiring Player: {playerState.currentPlayersIds.currentHiringPlayer}</div>
                    )}
                    <div className='gameInfoMetric'>Round: {gameState.round}</div>
                </div>
            </div>
        </>
    )
}