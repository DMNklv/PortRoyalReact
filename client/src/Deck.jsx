import cardBack from './assets/general/cardback.png'

export function Deck({ drawFunc }) {

    return (
        <>
            <div id="deckWrapper">
                <div className='discardPile cardSideways'></div>
                <div className="deckCards">
                    <img src={cardBack} alt="" className="deck card" onClick={() => drawFunc()} />
                </div>
            </div>
        </>
    )
}