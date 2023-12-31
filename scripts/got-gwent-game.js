import { houseLannisterCards} from "../data/lannister-cards.js";
import {houseTargaryenCards} from "../data/targaryen-cards.js";
import {cardsInDeck} from "../data/cards-in-deck.js";

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  event.returnValue = 'Are you sure you want to leave this page?';
});
document.querySelector('.js-add-to-row').style.display = "none";
document.querySelector('.js-escape').style.display = "none";

//playing game
displayPlayerLeader();
displayOpponentLeader();

let playersCardsToPlay = JSON.parse(sessionStorage.getItem('players-cards-to-play'));
if(!playersCardsToPlay){
  playersCardsToPlay = chooseCards(5, cardsInDeck);
  sessionStorage.setItem('players-cards-to-play', JSON.stringify(playersCardsToPlay));
}
let playerLeftCardsInDeck = JSON.parse(sessionStorage.getItem('players-left-cards'));
if(!playerLeftCardsInDeck){
  playerLeftCardsInDeck = leftCardsInDeck(cardsInDeck, playersCardsToPlay);
  sessionStorage.setItem('players-left-cards', JSON.stringify(playerLeftCardsInDeck));
}
let opponentCardsInDeck = JSON.parse(sessionStorage.getItem('opponent-cards-in-deck'));
if(!opponentCardsInDeck){
  opponentCardsInDeck = chooseCards(11, JSON.parse(sessionStorage.getItem('opponent-cards')));
  sessionStorage.setItem('opponent-cards-in-deck', JSON.stringify(opponentCardsInDeck));
}
let opponentCardsToPlay = JSON.parse(sessionStorage.getItem('opponent-cards-to-play'));
if(!opponentCardsToPlay){
  opponentCardsToPlay = chooseCards(5, opponentCardsInDeck);
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
let passCount = 0;
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
  document.querySelector('.js-message-window').style.display = ''
  document.querySelector('.js-message-window').innerHTML = `<p>${message}</p>`;
};

function hideMessageWindow(time){
  setTimeout(()=>{
    document.querySelector('.js-message-window').innerHTML = '';
    document.querySelector('.js-message-window').style.display = 'none'
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
      <div class="card js-card-${id}">
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
      <div class="card js-card-${id}">
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

let playerLosses = 0;
let opponentLosses = 0;

function playGame(){
  console.log(whoStarts);
  if (whoStarts === 'Player'){
    document.querySelector('.js-active-use').classList.remove('non-active-use');
    document.querySelector('.opponent-profile').classList.remove('active-player');
    document.querySelector('.player-profile').classList.add('active-player');
    document.querySelector('.js-pass-player').style.display = '';
    displayMessageWindow(`${whoStarts} turn`);
    hideMessageWindow(1800);
    return setTimeout(()=>{
      playerPass();
      playerMove();
    }, 1800);
  }
  if (whoStarts === 'Opponent'){
    document.querySelector('.opponent-profile').classList.add('active-player');
    document.querySelector('.player-profile').classList.remove('active-player');
    document.querySelector('.js-pass-player').style.display = 'none';
    displayMessageWindow(`${whoStarts} turn`);
    hideMessageWindow(1800);
    setTimeout(()=>{
      opponentMove();
    }, 1500);
    setTimeout(()=>{
      playGame();
    }, 3800);
    document.querySelector('.js-active-use').classList.add('non-active-use');
    setTimeout(()=>{
      document.querySelector('.js-active-use').classList.remove('non-active-use');
    }, 3800);
  }
  if(whoStarts === 'Player-pass'){
    document.querySelector('.opponent-profile').classList.add('active-player');
    document.querySelector('.player-profile').classList.remove('active-player');
    console.log(50)
    displayMessageWindow(`Opponent turn`);
    hideMessageWindow(1800);
    setTimeout(()=>{
      opponentMove();
      //playGame();
    }, 1800);
    document.querySelector('.js-active-use').classList.add('non-active-use');
  }
  if(whoStarts === 'Opponent-pass'){
    document.querySelector('.opponent-profile').classList.remove('active-player');
    document.querySelector('.player-profile').classList.add('active-player');
    displayMessageWindow(`Player turn`);
    hideMessageWindow(1800);
    setTimeout(()=>{
      playerPass();
      playerMove();
      document.querySelector('.js-pass-player').style.display = '';
    }, 1800);
  }
  if(whoStarts === 'Pass'){
    whoWinsRound();
    if(opponentLosses === 2){
      return console.log('End Player wins');
    }else if(playerLosses  === 2){
      return console.log('End Opponent wins');
    }else if(playerLosses === 2 && opponentLosses === 2){
      console.log('End Tie')
    } else {
      setTimeout(()=>{
        passCount = 0;
        playGame();
      }, 2000);
      console.log('round end');
    }
    }
};

function playerMove(){
  if(playersCardsToPlay.length === 0){
    if(whoStarts === 'Opponent-pass'){
      document.querySelector('.js-player-pass-message').style.display = "flex";
      whoStarts = 'Pass';
      playGame();
    } else{
      document.querySelector('.js-player-pass-message').style.display = "flex";
      whoStarts = 'Player-pass';
      playGame()
    }
  } else {
    document.querySelectorAll('.js-card-to-play').forEach((card) =>{
      card.addEventListener('click', ()=>{
        const cardId = card.dataset.cardId;
        chooseCardToPlay(cardId);
      })
    });
  }
};

function chooseCardToPlay(cardId){
  let cardHTML = '';
  let rowToChoose;
  let rowName;

  playersCardsToPlay.forEach((playerCard) =>{
    const {id, type, img, value, typeImg, abilityImg, ability} = playerCard;
    if (cardId === playerCard.id){
      document.querySelector('.js-add-to-row').style.display = "";
      document.querySelector('.js-escape').style.display = "";
      document.querySelector('.js-choose-card').style.display = "none";
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
        if(ability === 'spy'){
          document.querySelector('.js-sword-row-opponent').classList.add('row-to-choose');
          rowToChoose = opponentSwordRow;
          rowName = 'sword-row-opponent';
        } else{
          document.querySelector('.js-sword-row-player').classList.add('row-to-choose');
          rowToChoose = playerSwordRow;
          rowName = 'sword-row-player';
        }

      } else if(type === 'bow'){
        if(ability === 'spy'){
          document.querySelector('.js-bow-row-opponent').classList.add('row-to-choose');
        } else{
          document.querySelector('.js-bow-row-player').classList.add('row-to-choose');
          rowToChoose = playerBowRow;
          rowName = 'bow-row-player';
        }

      } else if(type === 'catapult'){
        if(ability === 'spy'){
          document.querySelector('.js-catapult-row-opponent').classList.add('row-to-choose');
        } else{
          document.querySelector('.js-catapult-row-player').classList.add('row-to-choose');
          rowToChoose = playerCatapultRow;
          rowName = 'catapult-row-player';
        }

      }
    }
  })

  document.querySelector('.js-active-card-to-play').innerHTML = cardHTML;

  document.querySelector('.js-active-use').classList.add('non-active-use');

 
    document.querySelector('.row-to-choose').addEventListener('click', () =>{
      document.querySelector('.js-active-card-to-play').innerHTML = '';
      addCardToRow(cardId, rowToChoose, rowName);
      removeClasses();
      playGame();
    });
 
  document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'Escape'){
        document.querySelector('.js-active-card-to-play').innerHTML = '';
        removeClasses();
        document.querySelector(`.js-card-to-play-${cardId}`).classList.remove('display-none');
        rowToChoose = '';
    }
  });

  document.querySelector('.js-escape').addEventListener('click', ()=>{
    document.querySelector('.js-active-card-to-play').innerHTML = '';
    removeClasses();
    document.querySelector(`.js-card-to-play-${cardId}`).classList.remove('display-none');
    rowToChoose = '';
  });

  function removeClasses(){
    document.querySelector('.js-sword-row-opponent').classList.remove('row-to-choose');
    document.querySelector('.js-bow-row-opponent').classList.remove('row-to-choose');
    document.querySelector('.js-catapult-row-opponent').classList.remove('row-to-choose');

    document.querySelector('.js-sword-row-player').classList.remove('row-to-choose');
    document.querySelector('.js-bow-row-player').classList.remove('row-to-choose');
    document.querySelector('.js-catapult-row-player').classList.remove('row-to-choose');
    document.querySelector('.js-active-use').classList.remove('non-active-use');

    document.querySelector('.js-add-to-row').style.display = "none";
    document.querySelector('.js-escape').style.display = "none";
    document.querySelector('.js-choose-card').style.display = "";
  }
};

function addCardToRow(cardId, typeRowCard, row){
  let newCardsToPlay = [];
  let newCardsToPlayAfterGroup = [];
  console.log(cardId)

  playersCardsToPlay.forEach((playerCard) => {
    const {id} = playerCard;
    if(id !== cardId){
      newCardsToPlay.push(playerCard);
    } else if(id === cardId){
      typeRowCard.push(playerCard);
      
      if(playerCard.ability === 'bond'){
        bondAbility(typeRowCard);
      }

      if(playerCard.ability === 'spy'){
        spyAbility('player', playerLeftCardsInDeck, playersCardsToPlay, cardId);
      }

      if(playerCard.ability === 'group'){
        const {group} = playerCard
        groupAbility('player', playersCardsToPlay, playerLeftCardsInDeck, group, typeRowCard);

        playersCardsToPlay.forEach((card) =>{
          if(group !== card.group){
            newCardsToPlayAfterGroup.push(card);
          }
        });
      }

      if(whoStarts === 'Opponent-pass'){
        whoStarts = 'Opponent-pass';
      }else{
        whoStarts = 'Opponent';
      }
    }
  });
  if(typeRowCard === opponentSwordRow || typeRowCard === opponentBowRow || typeRowCard === opponentCatapultRow ){
    newCardsToPlay = spyAbility('player', playerLeftCardsInDeck, playersCardsToPlay, cardId);
  }
  if(newCardsToPlayAfterGroup.length !== 0){
    newCardsToPlay = newCardsToPlayAfterGroup;
  }
  playersCardsToPlay = newCardsToPlay;
  document.querySelector('.js-player-cards-to-use').innerHTML = '';
  displayCards(playersCardsToPlay, 'no');
  displayCards(typeRowCard, row);
  countPoints(typeRowCard);
  addedPoints('Player');
  updateRemainingCards(playersCardsToPlay);
};

function opponentMove(){
  addedPoints('Player');
  addedPoints('Opponent');
  const opponentPoints =document.querySelector('.js-opponent-points').innerHTML;
  const playerPoints = document.querySelector('.js-player-points').innerHTML;
  //console.log(whoStarts);

  if(whoStarts === 'Player-pass'){
    console.log(20)
    if(opponentCardsToPlay.length < 1){
      document.querySelector('.js-opponent-pass-message').style.display = "flex";
  
      whoStarts = 'Pass';
      playGame();
    } else if(Number(opponentPoints) > Number(playerPoints)){
      document.querySelector('.js-opponent-pass-message').style.display = "flex";

      whoStarts = 'Pass';
      playGame();
    } else if(Number(opponentPoints) <= Number(playerPoints)){
      console.log('take more cards')
      
      opponentNextCard();
      addedPoints('Opponent');
      if(Number(opponentPoints) > Number(playerPoints)){
        whoStarts = 'Pass';
        playGame();
      } else{
        whoStarts = 'Player-pass';
        playGame();
      }
    }
  } 
  
  if(whoStarts === 'Opponent'){
    opponentNextCard();
  }

  function opponentNextCard(){
    if(opponentCardsToPlay.length < 1){
      document.querySelector('.js-opponent-pass-message').style.display = "flex";
      return whoStarts = 'Opponent-pass';
    }

    let newOpponentCards = [];
    let newCardsToPlayAfterGroup = [];
    const chosenCardArray = chooseCards(1, opponentCardsToPlay);
    let chosenCard = chosenCardArray[0];

    opponentCardsToPlay.forEach((card)=>{
      if(chosenCard.id !== card.id){
        newOpponentCards.push(card);
      }
    });
    opponentCardsToPlay = newOpponentCards;

    if(chosenCard.type === 'sword'){
      if(chosenCard.ability === 'spy'){
        playerSwordRow.push(chosenCard);
        spyAbility('opponent', opponentLeftCardsToPlay, opponentCardsToPlay, chosenCard.id);

        opponentCardsToPlay = spyAbility('opponent', opponentLeftCardsToPlay, opponentCardsToPlay, chosenCard.id);
        displayCards(playerSwordRow, 'sword-row-player');
        countPoints(playerSwordRow);
        addedPoints('Player');
      } else {
        opponentSwordRow.push(chosenCard);
      }
      if(chosenCard.ability === 'bond'){
        bondAbility(opponentSwordRow);
      }

      if(chosenCard.ability === 'group'){
        const {group} = chosenCard
        groupAbility('opponent', opponentCardsToPlay, opponentLeftCardsToPlay, group, opponentSwordRow);

        opponentCardsToPlay.forEach((card) =>{
          if(group !== card.group){
            newCardsToPlayAfterGroup.push(card);
          }
        });

        opponentCardsToPlay = newCardsToPlayAfterGroup;
      }

      displayCards(opponentSwordRow, 'sword-row-opponent');
      countPoints(opponentSwordRow);
      
    } else if(chosenCard.type === 'bow'){
      if(chosenCard.ability === 'spy'){
        playerBowRow.push(chosenCard);
        spyAbility('opponent', opponentLeftCardsToPlay, opponentCardsToPlay, chosenCard.id);

        opponentCardsToPlay = spyAbility('opponent', opponentLeftCardsToPlay, opponentCardsToPlay, chosenCard.id);
        displayCards(playerBowRow, 'sword-bow-player');
        countPoints(playerBowRow);
        addedPoints('Player');
      } else {
        opponentBowRow.push(chosenCard);
      }

      if(chosenCard.ability === 'bond'){
        bondAbility(opponentBowRow);
      }

      if(chosenCard.ability === 'group'){
        const {group} = chosenCard
        groupAbility('opponent', opponentCardsToPlay, opponentLeftCardsToPlay, group, opponentBowRow);

        opponentCardsToPlay.forEach((card) =>{
          if(group !== card.group){
            newCardsToPlayAfterGroup.push(card);
          }
        });

        opponentCardsToPlay = newCardsToPlayAfterGroup;
      }

      displayCards(opponentBowRow, 'bow-row-opponent');
      countPoints(opponentBowRow);
    } else if(chosenCard.type === 'catapult'){
      if(chosenCard.ability === 'spy'){
        playerCatapultRow.push(chosenCard);
        spyAbility('opponent', opponentLeftCardsToPlay, opponentCardsToPlay, chosenCard.id);

        opponentCardsToPlay = spyAbility('opponent', opponentLeftCardsToPlay, opponentCardsToPlay, chosenCard.id);
        displayCards(playerCatapultRow, 'sword-bow-player');
        countPoints(playerCatapultRow);
        addedPoints('Player');
      } else {
        opponentCatapultRow.push(chosenCard);
      }

      if(chosenCard.ability === 'bond'){
        bondAbility(opponentCatapultRow);
      }

      if(chosenCard.ability === 'group'){
        const {group} = chosenCard
        groupAbility('opponent', opponentCardsToPlay, opponentLeftCardsToPlay, group, opponentCatapultRow);

        opponentCardsToPlay.forEach((card) =>{
          if(group !== card.group){
            newCardsToPlayAfterGroup.push(card);
          }
        });

        opponentCardsToPlay = newCardsToPlayAfterGroup;
      }

      displayCards(opponentCatapultRow, 'catapult-row-opponent');
      countPoints(opponentCatapultRow);
    }

    addedPoints('Opponent');
    updateRemainingCards(opponentCardsToPlay);

    if(opponentCardsToPlay.length < 1){
      document.querySelector('.js-opponent-pass-message').style.display = "flex";
      return whoStarts = 'Opponent-pass';
    } else{
      return whoStarts = 'Player';
    }
  };
};

function countPoints(typeRowCard){
  let points = 0;
  typeRowCard.forEach((card)=>{
    points += card.value
  });

  if(typeRowCard === playerSwordRow){
    document.querySelector('.js-sword-points').innerHTML = points;
  } else if(typeRowCard === playerBowRow){
    document.querySelector('.js-bow-points').innerHTML = points;
  } else if(typeRowCard === playerCatapultRow){
    document.querySelector('.js-catapult-points').innerHTML = points;
  } else if(typeRowCard === opponentCatapultRow){
    document.querySelector('.js-catapult-points-opponent').innerHTML = points;
  } else if(typeRowCard === opponentBowRow){
    document.querySelector('.js-bow-points-opponent').innerHTML = points;
  } else if(typeRowCard === opponentSwordRow){
    document.querySelector('.js-sword-points-opponent').innerHTML = points;
  } 
};

function addedPoints(player){
  if(player === 'Opponent'){
    const sword = document.querySelector('.js-sword-points-opponent').innerHTML;
    const bow = document.querySelector('.js-bow-points-opponent').innerHTML;
    const catapult = document.querySelector('.js-catapult-points-opponent').innerHTML;
    
    const points = Number(sword) + Number(bow) + Number(catapult);
    document.querySelector('.js-opponent-points').innerHTML = points;
  } else if(player === 'Player'){
    const sword = document.querySelector('.js-sword-points').innerHTML;
    const bow = document.querySelector('.js-bow-points').innerHTML;
    const catapult = document.querySelector('.js-catapult-points').innerHTML;
    
    const points = Number(sword) + Number(bow) + Number(catapult);
    document.querySelector('.js-player-points').innerHTML = points;
  }
};

function updateRemainingCards(cards){
  let remainingCards = 0;

  cards.forEach(()=>{
    remainingCards++;
  });

  if(cards === playersCardsToPlay){
    document.querySelector('.js-player-remaining-cards').innerHTML = remainingCards;
  } else if(cards === opponentCardsToPlay){
    document.querySelector('.js-opponent-remaining-cards').innerHTML = remainingCards;
  }
};

function playerPass(){
  const passButton = document.querySelector('.js-pass-player');

  let mouseTimer;
  function mouseDown(){
    mouseUp();
    mouseTimer = window.setTimeout(execMouseDown, 2000);
    passButton.classList.add('pass-option-active');
  }

  function mouseUp(){
    if (mouseTimer) window.clearTimeout(mouseTimer);
    passButton.classList.remove('pass-option-active');
  }

  function execMouseDown() {
    passCount++;
    if(passCount <2){
      passButton.style.display = "none";
      document.querySelector('.js-player-pass-message').style.display = "flex";
      if (whoStarts === 'Opponent-pass'){
        whoStarts = 'Pass';
        playGame();
      }else{
        whoStarts = 'Player-pass';
        playGame();
      }
    }
  }

  passButton.addEventListener('mousedown', mouseDown);
  document.body.addEventListener("mouseup", mouseUp);
  passButton.addEventListener('touchstart', mouseDown);
  document.body.addEventListener("touchend", mouseUp);
};

function whoWinsRound(){
  addedPoints('Player');
  addedPoints('Opponent'); 
  const opponentPoints = Number(document.querySelector('.js-opponent-points').innerHTML);
  const playerPoints = Number(document.querySelector('.js-player-points').innerHTML);
  console.log(opponentPoints);
  console.log(playerPoints);

  if(opponentPoints > playerPoints){
    console.log('Opp wins');
    playerLosses++;

    console.log(playerLosses);
    console.log(opponentLosses);
    document.querySelector(`.js-remaining-life-player-img-${playerLosses}`).src = 'images/icons/black-crown.png';

    if(playerLosses === 2){
      console.log('player losses = 2')
      winnerMessage('Opponent');
    } else{
      displayMessageWindow('Opponent won this round');
      hideMessageWindow(1800);
      setTimeout(()=>{
        restartBoard();
        whoStarts = 'Opponent';
      }, 1800);
    }
  }
  if(opponentPoints < playerPoints){
    console.log('Player wins');
    opponentLosses++;

    console.log(playerLosses);
    console.log(opponentLosses);
    document.querySelector(`.js-remaining-life-opponent-img-${opponentLosses}`).src = 'images/icons/black-crown.png';

    if(opponentLosses === 2){
      winnerMessage('Player');
    } else{
      displayMessageWindow('Player won this round');
      hideMessageWindow(1800);
      setTimeout(()=>{
        restartBoard();
        whoStarts = 'Player';
      }, 1800);
    }
  }
  if(opponentPoints === playerPoints){
    console.log('Tie');
    playerLosses++;
    opponentLosses++;

    console.log(playerLosses);
    console.log(opponentLosses);
    document.querySelector(`.js-remaining-life-opponent-img-${opponentLosses}`).src = 'images/icons/black-crown.png';
    document.querySelector(`.js-remaining-life-player-img-${playerLosses}`).src = 'images/icons/black-crown.png';

    if(playerLosses === 2 && opponentLosses === 2){
      winnerMessage('Tie');
    } else{
      displayMessageWindow('Tie');
      hideMessageWindow(1800);
      setTimeout(()=>{
        restartBoard();
        whoStarts = 'Player';
      }, 1800);
    }
  }
};

function restartBoard(){
  document.querySelector('.js-player-pass-message').style.display = "none";
  document.querySelector('.js-opponent-pass-message').style.display = "none";
  playerSwordRow = [];
  playerBowRow = [];
  playerCatapultRow = [];

  opponentSwordRow = [];
  opponentBowRow = [];
  opponentCatapultRow = [];

  countPoints(playerSwordRow);
  countPoints(playerBowRow);
  countPoints(playerCatapultRow);

  countPoints(opponentSwordRow);
  countPoints(opponentBowRow);
  countPoints(opponentCatapultRow);

  displayCards(playerSwordRow, 'sword-row-player');
  displayCards(playerBowRow, 'bow-row-player');
  displayCards(playerCatapultRow, 'catapult-row-player');

  displayCards(opponentSwordRow, 'sword-row-opponent');
  displayCards(opponentBowRow, 'bow-row-opponent');
  displayCards(opponentCatapultRow, 'catapult-row-opponent');

  addedPoints('Player');
  addedPoints('Opponent');
}

function winnerMessage(who){
  if(who === 'Tie'){
    document.querySelector('.js-winner-message-window').innerHTML = `<p>Tie</p>
    <div class="buttons">
      <div class="go-to-menu-container">
        <button class="js-go-to-menu">Go to menu</button>
          <div class="tooltip-info">
            <p>i</p>
            <div class="tooltip">All the settings will be delated.</div>
          </div>
      </div>
      <div class="restart-container">
        <button class="js-restart">Restart</button>
        <div class="tooltip-info">
            <p>i</p>
            <div class="tooltip">New cards to play will be generated for you and opponent will change too.</div>
          </div>
      </div>
    </div>
  `;
  }
  if(who === 'Opponent' || who === 'Player'){
    document.querySelector('.js-winner-message-window').innerHTML = `<p>${who} won</p>
    <div class="buttons">
      <div class="go-to-menu-container">
        <button class="js-go-to-menu">Go to menu</button>
          <div class="tooltip-info">
            <p>i</p>
            <div class="tooltip">All the settings will be delated.</div>
          </div>
      </div>
      <div class="restart-container">
        <button class="js-restart">Restart</button>
        <div class="tooltip-info">
            <p>i</p>
            <div class="tooltip">New cards to play will be generated for you and opponent will change too.</div>
          </div>
      </div>
    </div>
  `;
  }

  document.querySelector('.js-winner-message-window').classList.remove('display-none');
  document.querySelector('.js-exit-button').classList.add('display-none');

  document.querySelector('.js-go-to-menu').addEventListener('click', () =>{
    sessionStorage.removeItem('cards-in-deck');
    window.location.replace( "./index.html");
  });

  document.querySelector('.js-restart').addEventListener('click', () =>{
    document.querySelector('.js-exit-button').classList.remove('display-none');
    restartBoard();
    restart();
    window.location.reload()
  });
};

document.querySelector('.js-exit-button').addEventListener('click', () =>{
  document.querySelector('.js-exit-button').classList.add('display-none');
  document.querySelector('.js-winner-message-window').classList.remove('display-none');
  document.querySelector('.js-winner-message-window').innerHTML = 
  `<div class="close-exit-container">
    <button class="js-close-exit close-exit-button">X</button>
    </div>
    <div class="buttons">
      <div class="go-to-menu-container">
        <button class="js-go-to-menu">Go to menu</button>
          <div class="tooltip-info">
            <p>i</p>
            <div class="tooltip">All the settings will be delated.</div>
          </div>
      </div>
      <div class="restart-container">
        <button class="js-restart">Restart</button>
        <div class="tooltip-info">
            <p>i</p>
            <div class="tooltip">New cards to play will be generated for you and opponent will change too.</div>
          </div>
      </div>
    </div>
  `;

  document.querySelector('.js-go-to-menu').addEventListener('click', () =>{
    sessionStorage.removeItem('cards-in-deck');
    window.location.replace( "./index.html");
  });

  document.querySelector('.js-restart').addEventListener('click', () =>{
    restartBoard();
    restart();

    window.location.reload()
  });

  document.querySelector('.js-close-exit').addEventListener('click', () =>{
    document.querySelector('.js-winner-message-window').innerHTML = '';
    document.querySelector('.js-exit-button').classList.remove('display-none');
    document.querySelector('.js-winner-message-window').classList.add('display-none');
  });
});

function restart(){
    sessionStorage.removeItem('opponent-leader');
    sessionStorage.removeItem('opponent-house');
    sessionStorage.removeItem('opponent-crest');
    sessionStorage.removeItem('opponent-cards');

    sessionStorage.removeItem('players-cards-to-play');
    sessionStorage.removeItem('players-left-cards');
    sessionStorage.removeItem('opponent-cards-in-deck');
    sessionStorage.removeItem('opponent-cards-to-play');
    sessionStorage.removeItem('opponent-left-cards-to-play');
};

function bondAbility(typeRowCard){
  let bondCardsNumber = 0;
  typeRowCard.forEach((card)=>{
    let {ability} = card;
    if(ability === 'bond'){
      bondCardsNumber++
    }
  });

  typeRowCard.forEach((card)=>{
    let {ability, value} = card;
    if(ability === 'bond'){
      card['value'] = value * bondCardsNumber;
    }
  });
};

function groupAbility(who, cardsToPlay, cardsLeft, cardGroup, typeRowCard){
  let number = 0;
  let newCardsToPlay = [];
  let newCardsLeft = [];
  
  cardsToPlay.forEach((card) =>{
    if(card.group === cardGroup){
      number++;
      if(number > 1){
        typeRowCard.push(card);
      }
    } else if(card.group !== cardGroup){
      newCardsToPlay.push(card);
    }
  });

  cardsLeft.forEach((card) =>{
    if(card.group === cardGroup){
      typeRowCard.push(card);
    } else if(card.group !== cardGroup){
      newCardsLeft.push(card);
    }
  });

  cardsToPlay = newCardsToPlay;
  cardsLeft = newCardsLeft;
  console.log(cardsLeft);
  document.querySelector(`.js-${who}-left-cards`).innerHTML = updateNumberOfCardsLeft(cardsLeft);
};

function spyAbility(who, leftCards, playCards, cardId){
  let newCardsPlay = [];
  let newCardsLeft = [];
  const newCards = chooseCards(2, leftCards);
  const newCard1 = newCards[0];
  const newCard2 = newCards[1];

  leftCards.forEach((card) =>{
    if(card.id !== newCard1.id && card.id !== newCard2.id){
      newCardsLeft.push(card);
    }
  })

  playCards.forEach((card)=>{
    if(cardId !== card.id){
      newCardsPlay.push(card);
    }
  })

  leftCards = newCardsLeft;
  playCards = newCardsPlay;
  playCards.push(newCard1);
  playCards.push(newCard2);

  document.querySelector(`.js-${who}-left-cards`).innerHTML = updateNumberOfCardsLeft(leftCards);
  return playCards;
};