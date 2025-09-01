import { useSelector } from 'react-redux';
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

function Player({ player }) {

    const currentPlayersIds = useSelector(state => state.players.currentPlayersIds);

    return (
        <div className={`playerWrapper${player.id === currentPlayersIds.currentActivePlayer ? ' currentActivePlayer' : ''}${player.id === currentPlayersIds.currentHiringPlayer ? ' currentHiringPlayer' : ''}`}>
            <img src={`/general/expedition_required.png`} alt={`${player.name} Img`} className='playerAvatar' />
            <div className='playerInfoAndStats'>
                <div className='playerInfo'>
                    <div className='playerName'>{player.name} {player.isBot && '(Bot)'}</div>
                </div>
                <div className='playerStats'>
                    <div className='playerStat'>
                        <img src="/general/points.png" alt="" title='Victory Points' />
                        <div className='statValue'>
                            {player.victoryPoints}
                        </div>
                    </div>
                    <div className='playerStat'>
                        <img src="/general/coin.png" alt="" title='Coins' />
                        <div className='statValue'>
                            {player.coins}
                        </div>
                    </div>
                    <div className='playerStat'>
                        <img src="/general/sword.png" alt="" title='Swords' />
                        <div className='statValue'>
                            {player.swords}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}