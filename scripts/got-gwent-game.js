import { houseLannisterCards} from "../data/lannister-cards.js";
import {houseTargaryenCards} from "../data/targaryen-cards.js";
import {cardsInDeck} from "../data/cards-in-deck.js";

window.addEventListener('beforeunload', function (event) {
  sessionStorage.removeItem('cards-in-deck');
  event.preventDefault();
  event.returnValue = 'Are you sure you want to leave this page?';
});

//playing game
displayPlayerLeader();
displayOpponentLeader();
let playersCardsToPlay = JSON.parse(sessionStorage.getItem('players-cards-to-play'));
if(!playersCardsToPlay){
  playersCardsToPlay = chooseCards(4, cardsInDeck);
  sessionStorage.setItem('players-cards-to-play', JSON.stringify(playersCardsToPlay));
}
let playerLeftCardsInDeck = JSON.parse(sessionStorage.getItem('players-left-cards'));
if(!playerLeftCardsInDeck){
  playerLeftCardsInDeck = leftCardsInDeck(cardsInDeck, playersCardsToPlay);
  sessionStorage.setItem('players-left-cards', JSON.stringify(playerLeftCardsInDeck));
}
let opponentCardsInDeck = JSON.parse(sessionStorage.getItem('opponent-cards-in-deck'));
if(!opponentCardsInDeck){
  opponentCardsInDeck = chooseCards(8, houseLannisterCards);
  sessionStorage.setItem('opponent-cards-in-deck', JSON.stringify(opponentCardsInDeck));
}
let opponentCardsToPlay = JSON.parse(sessionStorage.getItem('opponent-cards-to-play'));
if(!opponentCardsToPlay){
  opponentCardsToPlay = chooseCards(4, opponentCardsInDeck);
  sessionStorage.setItem('opponent-cards-to-play', JSON.stringify(opponentCardsToPlay));
}
let opponentLeftCardsToPlay = JSON.parse(sessionStorage.getItem('opponent-left-cards-to-play'));
if(!opponentLeftCardsToPlay){
  opponentLeftCardsToPlay = leftCardsInDeck(opponentCardsInDeck, opponentCardsToPlay);
  sessionStorage.setItem('opponent-left-cards-to-play', JSON.stringify(opponentLeftCardsToPlay));
}

let redrawCardsNumber = 0;

displayCards(playersCardsToPlay, playerLeftCardsInDeck);
//

function displayPlayerLeader(){
  const house = JSON.parse(sessionStorage.getItem('house'));
  const leader = JSON.parse(sessionStorage.getItem('leader'));
  let cardsName;

  if(house === 'house-lannister'){
    cardsName = houseLannisterCards;
    document.querySelector('.js-player-card-decks-type').innerHTML = 'House Lannister';
    document.getElementById("js-player-crest").src="images/lannister-crest.jpg";
  } else if (house === 'house-targaryen'){
    cardsName = houseTargaryenCards;
    document.querySelector('.js-player-card-decks-type').innerHTML = 'House Targaryen';
    document.getElementById("js-player-crest").src="images/targaryen-crest.jfif";
  }
  
  cardsName.forEach((card) =>{
    const {id, img} = card;
    if(leader === id){
      document.querySelector('.js-profile-img').innerHTML =`
      <img class="profile-image" src="images/cards-images/${img}">
      `;
    }
  });
}

function displayOpponentLeader(){
  let opponentHouse = document.querySelector('.js-opponent-card-decks-type');
  let opponentCrest = document.getElementById("js-opponent-crest");
  let opponentLeader = document.querySelector('.js-opponent-progile-img');

  let cardsName = JSON.parse(sessionStorage.getItem('opponent-cards'));
  opponentHouse.innerHTML = JSON.parse(sessionStorage.getItem('opponent-house'));
  opponentCrest.src = JSON.parse(sessionStorage.getItem('opponent-crest'));
  opponentLeader.innerHTML = JSON.parse(sessionStorage.getItem('opponent-leader'));

  if(!cardsName){
    const randomNumber = Math.random();

    if(randomNumber >= 0 && randomNumber < 1/2){
      cardsName = houseLannisterCards;
      opponentHouse.innerHTML = 'House Lannister';
      opponentCrest.src="images/lannister-crest.jpg";
    } else if(randomNumber >= 1/2 && randomNumber <= 1){
      cardsName = houseTargaryenCards;
      opponentHouse.innerHTML = 'House Targaryen';
      opponentCrest.src="images/targaryen-crest.jfif";
    }

    if(randomNumber >= 0 && randomNumber < 1/3){
      const leaderCard = cardsName[0];
      opponentLeader.innerHTML =`
        <img class="profile-image" src="images/cards-images/${leaderCard.img}">
        `;
    } else if(randomNumber >= 1/3 && randomNumber < 2/3){
      const leaderCard = cardsName[1];
      opponentLeader.innerHTML =`
        <img class="profile-image" src="images/cards-images/${leaderCard.img}">
        `;
    } else if(randomNumber >= 2/3 && randomNumber <= 1){
      const leaderCard = cardsName[2];
      opponentLeader.innerHTML =`
        <img class="profile-image" src="images/cards-images/${leaderCard.img}">
        `;
    }

    sessionStorage.setItem('opponent-leader', JSON.stringify(opponentLeader.innerHTML));
    sessionStorage.setItem('opponent-cards', JSON.stringify(cardsName));
    sessionStorage.setItem('opponent-house', JSON.stringify(opponentHouse.innerHTML));
    sessionStorage.setItem('opponent-crest', JSON.stringify(opponentCrest.src));
  }
};

function chooseCards(numberOfCardsToChoose, cardsName){
  if(numberOfCardsToChoose > cardsName.length){
    throw new Error("Number of cards to choose cannot be greater than available cards.");
  }

  let newCardsCollection = [];

  cardsName.forEach((card) =>{
    const {type} =card;
    if (type !== 'leader'){
      newCardsCollection.push(card);
    }
  });

  const chosenCards = newCardsCollection.slice();

  for(let i = chosenCards.length -1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [chosenCards[i], chosenCards[j]] = [chosenCards[j], chosenCards[i]];
  }

  return chosenCards.slice(0, numberOfCardsToChoose);
};

function leftCardsInDeck(cardsInDeck, cardsToPlay){
  return cardsInDeck.filter(card => 
    !cardsToPlay.some(playCard => playCard.id === card.id)
  );
};

function displayCards(cardsName, leftcardsName){
  let displayCardsHTML = '';

  cardsName.forEach((card) =>{
    const {} = card;
    const {img, value, ability, abilityImg, typeImg, id, name, description} = card;

    if(ability === ''){
      const html =  `
      <div class="card card-wheel js-card"
      data-card-id=${id}>
          <img class="card-image card-wheel-img" src="images/cards-images/${img}">
          <span class="card-value-container">
            <p class="card-value">${value}</p>
          </span>
          <div class="card-attributes-container">
            <span class="card-type">
              <img class="card-attribute-img" src="images/icons/${typeImg}">
            </span>
          </div>
          <div class="details-container">
              <p class="card-name">${name}</p>
              <p class="card-description">${description}</p>
            </div>
        </div>
      `;

      displayCardsHTML += html;
    }else {
      const html =  `
      <div class="card card-wheel js-card"
      data-card-id=${id}>
        <img class="card-image card-wheel-img" src="images/cards-images/${img}">
        <span class="card-value-container">
          <p class="card-value">${value}</p>
        </span>
        <div class="card-attributes-container">
          <span class="card-ability">
            <img class="card-attribute-img" src="images/icons/abilities-icons/${abilityImg}">
          </span>
          <span class="card-type">
            <img class="card-attribute-img" src="images/icons/${typeImg}">
          </span>
        </div>
        <div class="details-container">
            <p class="card-name">${name}</p>
            <p class="card-description">${description}</p>
          </div>
      </div>
      `;

      displayCardsHTML += html;
    }
  });

  document.querySelector('.js-display-cards').innerHTML = displayCardsHTML;

  document.querySelector('.js-close-display-cards').addEventListener('click', () =>{
    document.querySelector('.js-display-cards').innerHTML = '';
    document.querySelector('.js-display-cards-container').classList.add('display-cards-non-visible');
  });

  

  document.querySelectorAll('.js-card').forEach((card) =>{
    card.addEventListener('click', ()=>{
      if(redrawCardsNumber < 2){
        const cardId =card.dataset.cardId;
        redrawCard(playerLeftCardsInDeck, cardId);
      } else {
        alert('You can redraw only 2 cards');
      }
      
    });
  });
};


function redrawCard(leftcardsName, cardId){
  let newCards = [];
  const newCardArray = chooseCards(1, leftcardsName);
  const newCard = newCardArray[0];
  newCards.push(newCard);

  playersCardsToPlay.forEach((playerCard) =>{
    if(cardId !== playerCard.id){
      newCards.push(playerCard);
    }
  })

  playersCardsToPlay = newCards;
  displayCards(playersCardsToPlay);

  sessionStorage.setItem('players-cards-to-play', JSON.stringify(playersCardsToPlay));
  redrawCardsNumber++;
  document.querySelector('.js-redraw-cards-count').innerHTML = redrawCardsNumber;
};