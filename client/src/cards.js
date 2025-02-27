import fs from 'fs'

async function createCardsAPI() {
    const personCards=  await fs.readdirSync('./assets/persons', {});
    const expeditionCards=  await fs.readdirSync('./assets/expeditions', {});
    const shipCards=  await fs.readdirSync('./assets/ships', {});
    const taxIncreaseCards=  await fs.readdirSync('./assets/taxIncreases', {});

    const cardsData = {"cards":{"baseGameCards":[], "justOneMoreContractCards":[]}, "baseDeckComposition":[]};
    let cardId = 0;
    
    personCards.forEach((cardName, i) => {
        cardsData.cards.baseGameCards.push({"id": cardId, "name": cardName, "type": 'person', "desc": '', "cardUrl": `./assets/persons/${cardName}`});
        cardsData.baseDeckComposition.push({"cardId": cardId, "cardName": cardName, "quantity": 0});
        cardId++;
    });

    expeditionCards.forEach((cardName, i) => {
        if(cardName != 'expedition-5VP-3Coin-1Anchor_1Cross_1Cabin.png') {
            cardsData.cards.baseGameCards.push({"id": cardId, "name": cardName, "type": 'expedition', "desc": '', "cardUrl": `./assets/expeditions/${cardName}`});
            cardsData.baseDeckComposition.push({"cardId": cardId, "cardName": cardName, "quantity": 0});
        } else {
            cardsData.cards.baseGameCards.push({"id": cardId, "name": cardName, "type": 'expedition', "desc": '', "cardUrl": `./assets/expeditions/${cardName}`, "minPlayers": 5});
            cardsData.baseDeckComposition.push({"cardId": cardId, "cardName": cardName, "quantity": 1, "minPlayers": 5});
        }

        cardId++;
    });

    shipCards.forEach((cardName, i) => {
        cardsData.cards.baseGameCards.push({"id": cardId, "name": cardName, "type": 'ship', "desc": '', "cardUrl": `./assets/ships/${cardName}`});
        cardsData.baseDeckComposition.push({"cardId": cardId, "cardName": cardName, "quantity": 0});

        cardId++;
    });

    taxIncreaseCards.forEach((cardName, i) => {
        cardsData.cards.baseGameCards.push({"id": cardId, "name": cardName, "type": 'taxIncrease', "desc": '', "cardUrl": `./assets/taxIncreases/${cardName}`});
        cardsData.baseDeckComposition.push({"cardId": cardId, "cardName": cardName, "quantity": 0});

        cardId++;
    });
    // console.log(cardsData);
    // console.log(cardsData);
    // console.log(Object.keys(cardsData).length);


    // await fs.writeFile('cardsData.js', JSON.stringify(cardsData), function(){});
}

createCardsAPI();

// export const allCards = [
//     {}
// ]

