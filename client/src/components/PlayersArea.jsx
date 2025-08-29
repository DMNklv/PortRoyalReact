import { useSelector } from 'react-redux';
import '../css/PlayersArea.css'

export function PlayersArea() {

    const gameState = useSelector(state => state.game);
    const playerState = useSelector(state => state.players);
    const players = playerState.players || [];

    return (
        <>
            <div id="playersAndGameInfoWrapper">
                <div className='playersWrapper'>
                    {players.map((player, index) => (
                        <Player key={player.id} player={player} />
                    ))}
                </div>
                <div id='gameInfo'>
                    <div>Current Phase: {gameState.phase}</div>
                    <div>Active player: Player 1</div>
                    <div>Current Player: Player 1</div>
                    <div>Round: 1</div>
                </div>
            </div>
        </>
    )
}

function Player({ player }) {

    const currentPlayerId = useSelector(state => state.players.currentPlayerId);

    return (
        <div className={`playerWrapper${player.id === currentPlayerId ? ' currentActivePlayer' : ''}`} title={JSON.stringify(player)}>
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