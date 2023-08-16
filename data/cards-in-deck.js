export let cardsInDeck = [];

export function removeCard(fraction, cardId){
  let newCardsInDeck =[];
    cardsInDeck.forEach((deckCard) =>{
      if(deckCard.id === cardId){
        fraction.push(deckCard);
      }else if(deckCard.id !== cardId){
        newCardsInDeck.push(deckCard);
      }
    });
    
    cardsInDeck = newCardsInDeck;
};

export function resetCardsInDeck(){
  cardsInDeck = [];
}