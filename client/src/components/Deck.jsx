import cardBack from '../assets/general/cardback.png'

export function Deck() {

    return (
        <>
            <div id="deckWrapper">
                <div className='discardPile cardSideways'></div>
                <div className="deckCards">
                    <img src={cardBack} alt="" className="deck card"  />
                </div>
            </div>
        </>
    )
}