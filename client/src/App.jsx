import { useState } from 'react'
import './css/App.css'
import { PlayersTop } from './PlayersTop'
import { Table } from './Table'
import { PlayersBottom } from './PlayersBottom'
import { cardsData } from './cardsData'





function App() {
  const [gamePhase, setGamePhase] = useState('Discover');
  const [gameDeck, setGameDeck] = useState(cardsData);

  console.log(gameDeck);
  

  return (
    <>
      <PlayersTop />
      <Table />
      <PlayersBottom />
    </>
  )
}

export default App
