export function TaxIncreaseCard({ taxIncrease }) {
    return (
        <div className="taxIncreaseCard">
            <img src={taxIncrease.cardUrl} alt={taxIncrease.name} className="taxIncreaseImg" />
            <div className="cardDetails.show">
                <p className="taxIncreaseDesc">{taxIncrease.desc}</p>
            </div>
        </div>
    )
}