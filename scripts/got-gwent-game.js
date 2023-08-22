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
  opponentCardsInDeck = chooseCards(8, JSON.parse(sessionStorage.getItem('opponent-cards')));
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

document.querySelector('.js-player-left-cards').innerHTML = updateNumberOfCardsLeft(playerLeftCardsInDeck);
document.querySelector('.js-opponent-left-cards').innerHTML = updateNumberOfCardsLeft(opponentLeftCardsToPlay);

document.querySelector('.js-player-remaining-cards').innerHTML = updateNumberOfCardsLeft(playersCardsToPlay);
document.querySelector('.js-opponent-remaining-cards').innerHTML = updateNumberOfCardsLeft(opponentCardsToPlay);

let playerSwordRow = [];
let playerBowRow = [];
let playerCatapultRow = [];

let opponentSwordRow = [];
let opponentBowRow = [];
let opponentCatapultRow = [];
let redrawCardsNumber = 0;
let whoStarts;
whoStartsGame();
hideMessageWindow(2000);
setTimeout(()=>{
  document.querySelector('.js-display-cards-container').classList.remove('display-none')
  displayCards(playersCardsToPlay, 'yes')
}, 2200);
//

function whoStartsGame(){
  const randomNumber = Math.random();
  let message = '';
  if(randomNumber >= 0 && randomNumber < 1/2){
    message = '<p>You will go first</p>';
    whoStarts = 'Player';
  } else if(randomNumber >= 1/2 && randomNumber <= 1){
    message = '<p>Opponent will go first</p>';
    whoStarts = 'Opponent';
  }

  document.querySelector('.js-message-window').innerHTML = message;
};

function displayMessageWindow(message){
  document.querySelector('.js-message-window').classList.remove('display-none');
  document.querySelector('.js-message-window').innerHTML = `<p>${message}</p>`;
};

function hideMessageWindow(time){
  setTimeout(()=>{
    document.querySelector('.js-message-window').innerHTML = '';
    document.querySelector('.js-message-window').classList.add('display-none')
  }, time)
}

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

function displayCards(cardsName, forStart){
  let displayCardsHTML = '';
  let playCardHTML = '';
  let opponentCardHTML ='';

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

      const jsCardHTML =  `
      <div class="card js-card-to-play js-card-to-play-${id}"
      data-card-id=${id}>
          <img class="card-image" src="images/cards-images/${img}">
          <span class="card-value-container">
            <p class="card-value">${value}</p>
          </span>
          <div class="card-attributes-container">
            <span class="card-type">
              <img class="card-attribute-img" src="images/icons/${typeImg}">
            </span>
          </div>
        </div>
      `;
      playCardHTML += jsCardHTML;

      const opCardHTML =  `
      <div class="card js-card">
          <img class="card-image" src="images/cards-images/${img}">
          <span class="card-value-container">
            <p class="card-value">${value}</p>
          </span>
          <div class="card-attributes-container">
            <span class="card-type">
              <img class="card-attribute-img" src="images/icons/${typeImg}">
            </span>
          </div>
        </div>
      `;
      opponentCardHTML += opCardHTML;
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

      const jsCardHTML =  `
      <div class="card js-card-to-play js-card-to-play-${id}"
      data-card-id=${id}>
        <img class="card-image" src="images/cards-images/${img}">
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
      </div>
      `;
      playCardHTML += jsCardHTML;

      const opCardHTML =  `
      <div class="card js-card">
          <img class="card-image" src="images/cards-images/${img}">
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
        </div>
      `;
      opponentCardHTML += opCardHTML;
    }
  });

  if(forStart === 'yes'){
    document.querySelector('.js-display-cards').innerHTML = displayCardsHTML;

    document.querySelector('.js-close-display-cards').addEventListener('click', () =>{
      document.querySelector('.js-display-cards').innerHTML = '';
      document.querySelector('.js-display-cards-container').classList.add('display-cards-non-visible');

      document.querySelector('.js-player-cards-to-use').innerHTML = playCardHTML;

      displayMessageWindow('Round Start');
      hideMessageWindow(1800);
      setTimeout(()=>{
        displayMessageWindow(`${whoStarts} move`);
        hideMessageWindow(1800);
      }, 1800);
      setTimeout(()=>{
        playGame();
      }, 3600);
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
  } else if (forStart === 'no'){
    document.querySelector('.js-player-cards-to-use').innerHTML = 
    `<div class="js-active-use"></div>
    ${playCardHTML}`;
  } else if (forStart === 'sword-row-player'){
    document.querySelector('.js-sword-row-player').innerHTML = playCardHTML;
  } else if (forStart === 'bow-row-player'){
    document.querySelector('.js-bow-row-player').innerHTML = playCardHTML;
  } else if (forStart === 'catapult-row-player'){
    document.querySelector('.js-catapult-row-player').innerHTML = playCardHTML;
  } else if (forStart === 'sword-row-opponent'){
    document.querySelector('.js-sword-row-opponent').innerHTML = opponentCardHTML;
  } else if (forStart === 'bow-row-opponent'){
    document.querySelector('.js-bow-row-opponent').innerHTML = opponentCardHTML;
  } else if (forStart === 'catapult-row-opponent'){
    document.querySelector('.js-catapult-row-opponent').innerHTML = opponentCardHTML;
  }
  

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
  displayCards(playersCardsToPlay, 'yes');

  sessionStorage.setItem('players-cards-to-play', JSON.stringify(playersCardsToPlay));
  redrawCardsNumber++;
  document.querySelector('.js-redraw-cards-count').innerHTML = redrawCardsNumber;
};

function updateNumberOfCardsLeft(cardsName){
  let cardsNumber = 0;
  cardsName.forEach((card)=>{
    cardsNumber++;
  })

  return cardsNumber;
};

function playGame(){
  //playerMove();
  
  if (whoStarts === 'Player'){
    console.log('player move');
    console.log('click')
    playerMove();
  }
  if (whoStarts === 'Opponent'){
    console.log('opponent move');
    opponentMove();
    
    document.querySelector('.js-active-use').classList.add('non-active-use')
    setTimeout(()=>{
      document.querySelector('.js-active-use').classList.remove('non-active-use');
    }, 1500);
    //whoStarts = 'Player';
    //playGame();
    displayMessageWindow(`${whoStarts} turn`);
    hideMessageWindow(1500);
  }
  
};

function playerMove(){
  document.querySelectorAll('.js-card-to-play').forEach((card) =>{
    card.addEventListener('click', ()=>{
      const cardId = card.dataset.cardId;
      console.log(cardId);
      chooseCardToPlay(cardId);
    })
  });
};

function chooseCardToPlay(cardId){
  let cardHTML = '';
  let rowToChoose;
  let rowName;

  playersCardsToPlay.forEach((playerCard) =>{
    const {id, type, img, value, typeImg, abilityImg} = playerCard;
    if (cardId === playerCard.id){
      document.querySelector(`.js-card-to-play-${cardId}`).classList.add('display-none');
      if(playerCard.ability === ''){
        cardHTML = `
        <div class="card active-card-to-play"
        data-card-id=${id}>
            <img class="card-image" src="images/cards-images/${img}">
            <span class="card-value-container">
              <p class="card-value">${value}</p>
            </span>
            <div class="card-attributes-container">
              <span class="card-type">
                <img class="card-attribute-img" src="images/icons/${typeImg}">
              </span>
            </div>
          </div>
      `;
      } else{
        cardHTML = `
        <div class="card active-card-to-play"
        data-card-id=${id}>
            <img class="card-image" src="images/cards-images/${img}">
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
          </div>
      `;
      }

      if(type === 'sword'){
        document.querySelector('.js-sword-row-player').classList.add('row-to-choose');
        rowToChoose = playerSwordRow;
        rowName = 'sword-row-player';
      } else if(type === 'bow'){
        document.querySelector('.js-bow-row-player').classList.add('row-to-choose');
        rowToChoose = playerBowRow;
        rowName = 'bow-row-player';
      } else if(type === 'catapult'){
        document.querySelector('.js-catapult-row-player').classList.add('row-to-choose');
        rowToChoose = playerCatapultRow;
        rowName = 'catapult-row-player';
      }
    }
  })

  document.querySelector('.js-active-card-to-play').innerHTML = cardHTML;
  
  console.log(cardId)
  document.querySelector('.js-active-use').classList.add('non-active-use');

 
    document.querySelector('.row-to-choose').addEventListener('click', () =>{
      console.log(cardId)
      console.log(4);
      document.querySelector('.js-active-card-to-play').innerHTML = '';
      addCardToRow(cardId, rowToChoose, rowName);
      removeClasses();
      //whoStarts = 'Opponent';
      playGame();
    });
 
  

/*
document.querySelector('.js-sword-row-player').addEventListener('click', () =>{
  console.log(chosenCardId)
  console.log(4);
  document.querySelector('.js-active-card-to-play').innerHTML = '';
  addCardToRow(chosenCardId, rowToChoose, rowName);
  removeClasses();
  whoStarts = 'Opponent';
  playGame();
});*/

  document.body.addEventListener('keydown', (event) =>{
      if(event.key === 'Escape'){
          document.querySelector('.js-active-card-to-play').innerHTML = '';
          removeClasses();
          document.querySelector(`.js-card-to-play-${cardId}`).classList.remove('display-none');
          rowToChoose = '';
      }
    });

  function removeClasses(){
    document.querySelector('.js-sword-row-player').classList.remove('row-to-choose');
    document.querySelector('.js-bow-row-player').classList.remove('row-to-choose');
    document.querySelector('.js-catapult-row-player').classList.remove('row-to-choose');
    document.querySelector('.js-active-use').classList.remove('non-active-use');
  }
};

function addCardToRow(cardId, typeRowCard, row){
  let newCardsToPlay = [];
  console.log(cardId)

  playersCardsToPlay.forEach((playerCard) => {
    const {id} = playerCard;
    if(id !== cardId){
      newCardsToPlay.push(playerCard);
    } else if(id === cardId){
      typeRowCard.push(playerCard);
      console.log(3);
      whoStarts = 'Opponent';
    }
  });
  playersCardsToPlay = newCardsToPlay;
  document.querySelector('.js-player-cards-to-use').innerHTML = '';
  displayCards(playersCardsToPlay, 'no');
  displayCards(typeRowCard, row);
  console.log(2);
  //whoStarts = 'Opponent';
  //playGame();
};

function opponentMove(){
  if(opponentCardsToPlay.length < 1){
    console.log('error');
  }
  let newOpponentCards = [];
  const chosenCardArray = chooseCards(1, opponentCardsToPlay);
  let chosenCard = chosenCardArray[0];
  //console.log(chosenCard)

  opponentCardsToPlay.forEach((card)=>{
    if(chosenCard.id !== card.id){
      newOpponentCards.push(card);
    }
  });
  opponentCardsToPlay = newOpponentCards;

  if(chosenCard.type === 'sword'){
    opponentSwordRow.push(chosenCard);
    //console.log(opponentSwordRow)
    displayCards(opponentSwordRow, 'sword-row-opponent');
  } else if(chosenCard.type === 'bow'){
    opponentBowRow.push(chosenCard);
    displayCards(opponentBowRow, 'bow-row-opponent');
    //console.log(opponentBowRow)
  } else if(chosenCard.type === 'catapult'){
    opponentCatapultRow.push(chosenCard);
    //console.log(opponentCatapultRow)
  displayCards(opponentCatapultRow, 'catapult-row-opponent');
  }

  whoStarts = 'Player';
    playGame();
};