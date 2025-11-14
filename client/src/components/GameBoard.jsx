import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearTaxIncreaseCard } from "../store/slices/gameSlice";
import { Deck } from "./Deck";
import { Expeditions } from "./Expeditions";
import { Persons } from "./Persons";
import { Ships } from "./Ships";
import { TaxIncreaseCard } from "./TaxIncreaseCard";
import '../css/GameBoard.css'

export function GameBoard() {
    const dispatch = useDispatch();
    const taxIncreaseCard = useSelector(state => state.game.taxIncreaseCard);

    // useEffect(() => {
    //     if (taxIncreaseCard) {
    //         const timer = setTimeout(() => {
    //             dispatch(clearTaxIncreaseCard());
    //         }, 3000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [taxIncreaseCard, dispatch]);

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
            {taxIncreaseCard && (
                <>
                    <div className="taxIncreaseOverlay">
                        <TaxIncreaseCard taxIncrease={taxIncreaseCard} />
                    </div>
                    <button className="continueAfterTaxBtn" onClick={() => dispatch(clearTaxIncreaseCard())}>Continue</button>
                </>
            )}
            </div>
        </>
    )
}