import { useState } from 'react'
import './css/App.css'
import { PlayersTop } from './PlayersTop'
import { Table } from './Table'
import { PlayersBottom } from './PlayersBottom'





function App() {
  const [gamePhase, setGamePhase] = useState('Drawing');
  const [remainingCardsInDeck, setRemainingCardsInDeck] = useState([]);

  return (
    <>
      <PlayersTop />
      <Table />
      <PlayersBottom />
    </>
  )
}

export default App
