import fs from 'fs'

async function test() {
    const cardNames =  await fs.readdirSync('./assets/ships', {});

    const cardsData = [];
    
    cardNames.forEach((cardName, i) => {
        if(cardName !='special') {
            cardsData.push({id: i, name: cardName, type: 'ship', desc: '', cardUrl: `./assets/ships/${cardName}`})
        }
        
    })
    console.log(cardsData);


    // await fs.writeFile('baseDeckCardsData.js', JSON.stringify(cardsData), function(){});
}

// test();

// export const allCards = [
//     {}
// ]

