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
  const players = useSelector(state => state.players.players);
  
  const [gameSettings, setGameSettings] = useState({
    maxPlayers: 4,
    victoryPoints: 12,
    expeditionMode: false
  });

  const handleStartGame = async () => {
    console.log('🚀 Starting new game...');
    
    // Make sure we have players first
    if (players.length === 0) {
      console.log('👥 Adding default players...');
      dispatch(addPlayer({ name: 'Player 1' }));
      dispatch(addPlayer({ name: 'Player 2' }));
      dispatch(addPlayer({ name: 'Bot 1', isBot: true }));
    }
    
    // Dispatch the async thunk
    dispatch(startGame(gameSettings));
  };

  return (
    // <GameProvider>
    <>
      <PlayersArea />
      <GameBoard  />
      <div className="settings">
        <label>
          Max Players:
          <select 
            value={gameSettings.maxPlayers}
            onChange={(e) => setGameSettings({
              ...gameSettings,
              maxPlayers: parseInt(e.target.value)
            })}
          >
            <option value={2}>2 Players</option>
            <option value={3}>3 Players</option>
            <option value={4}>4 Players</option>
          </select>
        </label>
        
        <label>
          Victory Points:
          <input
            type="number"
            min="8"
            max="20"
            value={gameSettings.victoryPoints}
            onChange={(e) => setGameSettings({
              ...gameSettings,
              victoryPoints: parseInt(e.target.value)
            })}
          />
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={gameSettings.expeditionMode}
            onChange={(e) => setGameSettings({
              ...gameSettings,
              expeditionMode: e.target.checked
            })}
          />
          Expedition Mode
        </label>
      </div>
      
      <div className="players">
        <h3>Players ({players.length})</h3>
        {players.map(player => (
          <div key={player.id}>
            {player.name} {player.isBot && '(Bot)'}
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleStartGame}
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
