import fs from 'fs'

async function createCardsAPI() {
    const personCards=  await fs.readdirSync('./assets/persons', {});
    const expeditionCards=  await fs.readdirSync('./assets/expeditions', {});
    const shipCards=  await fs.readdirSync('./assets/ships', {});
    const taxIncreaseCards=  await fs.readdirSync('./assets/taxIncreases', {});

    const cardsData = {"cards":{"baseGameCards":[], "justOneMoreContractCards":[]}, "baseDeckComposition":[]};
    let cardId = 0;
    
    personCards.forEach((cardName, i) => {
        cardsData.cards.baseGameCards.push({id: cardId, name: cardName, type: 'person', desc: '', cardUrl: `./assets/persons/${cardName}`})
        cardId++;
    });

    expeditionCards.forEach((cardName, i) => {
        cardsData.cards.baseGameCards.push({id: cardId, name: cardName, type: 'expedition', desc: '', cardUrl: `./assets/expeditions/${cardName}`})
        cardId++;
    });

    shipCards.forEach((cardName, i) => {
        cardsData.cards.baseGameCards.push({id: cardId, name: cardName, type: 'ship', desc: '', cardUrl: `./assets/ships/${cardName}`})
        cardId++;
    });

    taxIncreaseCards.forEach((cardName, i) => {
        cardsData.cards.baseGameCards.push({id: cardId, name: cardName, type: 'taxIncrease', desc: '', cardUrl: `./assets/taxIncreases/${cardName}`})
        cardId++;
    });
    // console.log(cardsData);
    console.log(cardsData);
    console.log(Object.keys(cardsData).length);


    // await fs.writeFile('cardsData.js', JSON.stringify(cardsData), function(){});
}

createCardsAPI();

// export const allCards = [
//     {}
// ]

