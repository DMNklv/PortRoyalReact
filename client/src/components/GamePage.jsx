import React, { useEffect, useContext, useCallback } from "react";
import { GameProvider, GameContext } from "../contexts/GameContext";
import { Table } from "./Table";
import { PlayersTop } from "./PlayersTop";
import { PlayersBottom } from "./PlayersBottom";

export default function GamePage() {
    const { drawToHarbor } = useContext(GameContext);
//   const drawCard = useCallback(() => {
//     const { deck, currentCardIndex, setCurrentCardIndex } = useContext(GameContext);

//     if (currentCardIndex < deck.length) {
//       const card = deck[currentCardIndex];
//       setCurrentCardIndex(currentCardIndex + 1);
//       console.log(card);
//     }
//   }, []);

  return (
    <GameProvider>
      <PlayersTop />
      <Table drawCard={drawToHarbor} />
      <PlayersBottom />
    </GameProvider>
  );
}
