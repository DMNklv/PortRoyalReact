import React, { useState, useEffect, useContext, useCallback } from "react";
// import { GameProvider, GameContext } from "../contexts/GameContext";
import { GameBoard } from "./GameBoard";
import { PlayersArea } from "./PlayersArea";
import { useDispatch, useSelector } from 'react-redux';
import { startGame } from '../store/slices/gameSlice';
import { addPlayer } from '../store/slices/playersSlice';

export default function GamePage() {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.game);
  const playersState = useSelector(state => state.players);

  const [numberOfPlayers, setNumberOfPlayers] = useState();

  const handleStartGame = () => {
    console.log('🚀 Starting new game...');
    
    // Make sure we have players first
    if (playersState.players.length === 0) {
      console.log('👥 Adding test players...');
      dispatch(addPlayer({ name: 'Player 1' }));
      dispatch(addPlayer({ name: 'Player 2' }));
      dispatch(addPlayer({ name: 'Bot 1', isBot: true }));
      dispatch(addPlayer({ name: 'Bot 2', isBot: true }));
      dispatch(addPlayer({ name: 'Bot 3', isBot: true }));
    }
    
    dispatch(startGame(gameState.gameSettings));
  };

  return (
    // <GameProvider>
    <>
      <PlayersArea />
      <GameBoard  />
      <div className="settings">
        <label>
          Number of players:
          <select 
            value={gameState.gameSettings.numberOfPlayers}
            onChange={(e) => setGameSettings({
              ...gameState.gameSettings,
              numberOfPlayers: parseInt(e.target.value)
            })}
          >
            <option value={2}>2 Players</option>
            <option value={3}>3 Players</option>
            <option value={4}>4 Players</option>
            <option value={5}>5 Players</option>
          </select>
        </label>
        
        <label>
          Victory Points:
          <input
            type="number"
            min="8"
            max="20"
            value={gameState.gameSettings.victoryPoints}
            onChange={(e) => setGameSettings({
              ...gameState.gameSettings,
              victoryPoints: parseInt(e.target.value)
            })}
          />
        </label>
        
        {/* <label>
          <input
            type="checkbox"
            checked={gameState.gameSettings.expeditionMode}
            onChange={(e) => setGameSettings({
              ...gameState.gameSettings,
              expeditionMode: e.target.checked
            })}
          />
          Expedition Mode
        </label> */}
      </div>
      
      {/* <div className="players">
        <h3>Players ({playersState.players.length})</h3>
        {playersState.players.map(player => (
          <div key={player.id}>
            {player.name} {player.isBot && '(Bot)'}
          </div>
        ))}
      </div> */}
      
      <button 
        onClick={() => handleStartGame()}
        disabled={gameState.isLoading}
        className="start-game-btn"
      >
        {gameState.isLoading ? 'Initializing...' : 'Start Game'}
      </button>
      
      {gameState.error && (
        <div className="error">
          Error: {gameState.error}
        </div>
      )}
    </>
    // </GameProvider>
  );
}
