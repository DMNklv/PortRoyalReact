import { useState } from "react";
import { Deck } from "./Deck";
import { Expeditions } from "./Expeditions";
import { Persons } from "./Persons";
import { Ships } from "./Ships";
import '../css/Table.css'

export function Table({ drawCard }) {

    return (
        <>
            <div id="tableWrapper">
                <Expeditions />
                <div className="deckAndCommonCards">
                    <Deck drawCard={drawCard}/>
                    <div id="shipsAndPersonsWrapper">
                        <Ships />
                        <Persons />
                    </div>
                </div>
            </div>
        </>
    )
}