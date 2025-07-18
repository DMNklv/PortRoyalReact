import { useState } from "react";
import { Deck } from "./Deck";
import { Expeditions } from "./Expeditions";
import { Persons } from "./Persons";
import { Ships } from "./Ships";
import '../css/Gameboard.css'

export function GameBoard() {

    return (
        <>
            <div id="gameBoardWrapper">
                <Expeditions />
                <div className="deckAndCommonCards">
                    <Deck />
                    <div id="shipsAndPersonsWrapper">
                        <Ships />
                        <Persons />
                    </div>
                </div>
            </div>
        </>
    )
}