import { useSelector } from 'react-redux';

export function Player({ player }) {

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