import { houseLannisterCards, houseLannisterInfo, houseStarkInfo } from "../data/lannister-cards.js";
import {houseTargaryenCards, houseTargaryenInfo } from "../data/targaryen-cards.js";
import {generateCardsCollectionMenu,generateCardsCollection} from "./utils/cards-collection.js";
import {cardsInDeck, removeCard, resetCardsInDeck} from "../data/cards-in-deck.js";

const cardsCollection = [houseStarkInfo,houseLannisterInfo, houseTargaryenInfo];

const buttonElementStart = document.querySelector('.js-button-start');

const buttonElementDecks = document.querySelector('.js-button-decks');

const divElement = document.querySelector('.action-screen');

buttonElementStart.addEventListener('click', ()=>{
  const menuHTML = `
  <div class="setup-menu">
    <form class="settings-form">
      <div class="choose-house">
        <p>Choose your house:</p>
        <div>
          <input type="radio" name="house" id="house-lannister" value="house-lannister">
          <label for="house-lannister">
            <img class="crest-radio-img" src="images/lannister-crest.jpg" alt="House Lannister">
          </label>
          <input type="radio" name="house" id="house-targaryen" value="house-targaryen">
          <label for="house-targaryen">
            <img class="crest-radio-img" src="images/targaryen-crest.jfif" alt="House Targaryen">
          </label>
        </div>
      </div>
      <div class="choose-leader js-choose-leader"></div>
      <div class="choose-team js-choose-team"></div>
    </form>
  </div>
  `
  divElement.innerHTML = menuHTML;
  addSetting();
});

buttonElementDecks.addEventListener('click', ()=>{
  generateCardsCollectionMenu(divElement, houseLannisterCards, cardsCollection, houseTargaryenInfo, houseLannisterInfo, houseStarkInfo);
});

function addSetting(){
  document.querySelector('#house-lannister').addEventListener('click', () =>{
    const inputValue = document.querySelector('#house-lannister').value;
    const divElement = document.querySelector('.js-choose-leader');
    if(divElement.innerHTML === ''){
      chooseLeader(inputValue);
    } else {
      divElement.innerHTML ='';
      document.querySelector('.js-choose-team').innerHTML ='';
      chooseLeader(inputValue);
      resetCardsInDeck();
    }
  });
  document.querySelector('#house-targaryen').addEventListener('click', () =>{
    const inputValue = document.querySelector('#house-targaryen').value;
    const divElement = document.querySelector('.js-choose-leader');
    if(divElement.innerHTML === ''){
      chooseLeader(inputValue);
    } else {
      divElement.innerHTML ='';
      document.querySelector('.js-choose-team').innerHTML ='';
      chooseLeader(inputValue);
      resetCardsInDeck();
    }
  });
};

function chooseLeader(fraction){
  let leadersHTML = '';
  let cardsName;
  if(fraction === 'house-lannister'){
    cardsName = houseLannisterCards;
  } else if (fraction === 'house-targaryen'){
    cardsName = houseTargaryenCards;
  }

  cardsName.forEach((card)=>{
    const {type, img, name, description, id} = card;

    if(type === 'leader'){
      const html = `
      <input class="leader js-leader" type="radio" name="leader" id="${id}" value="${id}">
        <label for="${id}">
          <div class="leader-card">
          <img class="leader-card-img" src="images/cards-images/${img}">
          </div>
        </label>
      `;

      leadersHTML += html;
    }
  });
  document.querySelector('.js-choose-leader').innerHTML += `
  <p>Choose leader:</p>
  <div class="leaders-wheel js-leaders-wheel"></div>
  `;
  document.querySelector('.js-leaders-wheel').innerHTML += leadersHTML;

  let onclickEvent = 0;
  document.querySelectorAll('.js-leader').forEach((radio) =>{
    radio.addEventListener('click', ()=>{
      onclickEvent++;
      if(onclickEvent <= 1){
        displayCardsMenu(cardsName);
        //sessionStorage.setItem('leader', JSON.stringify());
      }
    });
  });
};

function displayCardsMenu(fraction){
      document.querySelector('.js-choose-team').innerHTML =`
      <p class="question">Choose your army (double click to add or remove card):</p>
      <div class="cards-selection">
        <div class="cards-in-collection">
          <p class="info">Cards collection</p>
          <div class="cards-menu">
            <div class="filters-container">
              <div type="button" class="filter-button js-filter-all">
                <img class="filter-img" src="images/icons/cards.png">
              </div>
              <button type="button" class="filter-button js-filter-sword">
                <img class="filter-img"  src="images/icons/sword.png">
              </button>
              <button type="button" class="filter-button js-filter-bow">
                <img class="filter-img"  src="images/icons/bow.png">
              </button>
              <button type="button" class="filter-button js-filter-catapult">
                <img class="filter-img" src="images/icons/catapult.png">
              </button>
            </div>
          <div class="cards"></div>
        </div>
      </div>
      <div class="cards-to-use">
      <p class="info">Cards in the deck</p>
        <div class="cards-menu">
          <div class="filters-container">
            <div type="button" class="filter-button js-filter-all-cd">
              <img class="filter-img" src="images/icons/cards.png">
            </div>
            <button type="button" class="filter-button js-filter-sword-cd">
              <img class="filter-img"  src="images/icons/sword.png">
            </button>
            <button type="button" class="filter-button js-filter-bow-cd">
              <img class="filter-img"  src="images/icons/bow.png">
            </button>
            <button type="button" class="filter-button js-filter-catapult-cd">
              <img class="filter-img" src="images/icons/catapult.png">
            </button>
          </div>
          <div class="cards-in-deck-container js-cards-in-deck-container"></div>
        </div>
      </div>
      </div>
      <div class="play-button-container">
        <div class="card-count-container">
          <img id="cards-count-img" src="images/icons/cards(red).png">
          <p class="cards-count js-cards-count"></p>
        </div>
        <button class="play-button js-play-button" type="button">
          Play
        </button>
      </div>
      `;

  generateCardsCollection(fraction);
  displayCardsInDeck();
  updateCardCount();

  document.querySelectorAll('.js-card').forEach((card) =>{
    card.addEventListener('dblclick', () =>{
      const cardId =card.dataset.cardId;
      addCard(fraction, cardId);
    });
  });

  document.querySelectorAll('.js-card-in-deck').forEach((card) =>{
    card.addEventListener('dblclick', () =>{
      const cardId =card.dataset.cardId;
      removeCard(fraction, cardId);
      displayCardsInDeck();
      displayCardsMenu(fraction);
    });
  });
};

function addCard(fraction, cardId){
      let newCardsCollection =[];

      fraction.forEach((fractionCard) =>{
        if(fractionCard.id === cardId){
          cardsInDeck.push(fractionCard);
        }
        if(fractionCard.id !== cardId){
          newCardsCollection.push(fractionCard);
        }
      });
      fraction = newCardsCollection;
      displayCardsInDeck()
      displayCardsMenu(fraction);
};

function displayCardsInDeck(){
  let cardsInDeckHTML = '';
  cardsInDeck.forEach((card) =>{
    const {img, value, ability, abilityImg, typeImg, type, id} = card;
    if(ability === ''){
      const html =  `
      <div class="card js-card-in-deck"
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

      cardsInDeckHTML += html;
    }else {
      const html =  `
      <div class="card js-card-in-deck"
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

      cardsInDeckHTML += html;
    }
  });
  document.querySelector('.js-cards-in-deck-container').innerHTML = cardsInDeckHTML;
};
/*
function segregateCardsCollection(cardsName, selectedType){
  let cardsHTML = '';

  if(cardsName === cardsInDeck){
    cardsName.forEach((card)=>{
      const{img, value, ability, abilityImg, type, typeImg, id} = card;
      if(type === selectedType){
        if(ability === ''){
          const html =  `
          <div class="card js-card-in-deck"
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
  
        cardsHTML += html;
        } else{
          const html =`
          <div class="card js-card-in-deck"
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
  
        cardsHTML += html;
        }
      } else if (selectedType === 'all'){
        if(ability === '' && type !== 'leader'){
          const html =  `
          <div class="card js-card-in-deck"
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
        cardsHTML += html;
        } else if (type !== 'leader'){
          const html =`
          <div class="card js-card-in-deck"
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
  
        cardsHTML += html;
        }
      }
    });

    document.querySelector('.js-cards-in-deck-container').innerHTML= cardsHTML;
  } else{
    cardsName.forEach((card)=>{
      const{img, value, ability, abilityImg, type, typeImg, id} = card;
      if(type === selectedType){
        if(ability === ''){
          const html =  `
          <div class="card js-card" 
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
  
        cardsHTML += html;
        } else {
          const html =`
          <div class="card js-card"
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
  
        cardsHTML += html;
        }
      } else if (selectedType === 'all'){
        if(ability === '' && type !== 'leader'){
          const html =  `
          <div class="card js-card" 
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
  
        cardsHTML += html;
        } else if(type !== 'leader') {
          const html =`
          <div class="card js-card"
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
  
        cardsHTML += html;
        }
      }
    });

    document.querySelector('.cards').innerHTML= cardsHTML;
  }

 document.querySelectorAll('.js-card-in-deck').forEach((card) =>{
    card.addEventListener('dblclick', () =>{
      let cardId =card.dataset.cardId;
      console.log(cardId);
      
    });
  });

  document.querySelectorAll('.js-card').forEach((card) => {
    card.addEventListener('dblclick', () => {
      const cardId =card.dataset.cardId;
      addCard(cardsName, cardId, selectedType);
    });
  });
};*/

function updateCardCount(){
  let cardsInDeckNumber = 0;

  cardsInDeck.forEach(()=>{
    cardsInDeckNumber++;
  });

  if(cardsInDeckNumber >= 8){
    document.querySelector('.js-cards-count').classList.add('cards-count-is-enough');
    document.getElementById("cards-count-img").src="images/icons/cards.png";

    document.querySelector('.js-play-button').addEventListener('click', () =>{
      playGame();
    });
  } else if(cardsInDeckNumber <8){
    document.querySelector('.js-cards-count').classList.remove('cards-count-is-enough');
    document.querySelector('.js-play-button').addEventListener('click', () =>{
      alert('The cards in deck number has to be equal or greater than 8.');
    });
  }

  document.querySelector('.js-cards-count').innerHTML = `${cardsInDeckNumber}/8`;
  return cardsInDeckNumber;
};

function playGame(){
  const houseId = document.querySelector('input[name="house"]:checked').value;
  const leaderId = document.querySelector('input[name="leader"]:checked').value;
  sessionStorage.setItem('house', JSON.stringify(houseId));
  sessionStorage.setItem('leader', JSON.stringify(leaderId));
  sessionStorage.setItem('cards-in-deck', JSON.stringify(cardsInDeck));
  removeOpponentInfoFromStorage();
  window.location.replace( "./got-gwent-game.html");
}

function removeOpponentInfoFromStorage(){
  sessionStorage.removeItem('opponent-leader');
  sessionStorage.removeItem('opponent-house');
  sessionStorage.removeItem('opponent-crest');
  sessionStorage.removeItem('opponent-cards');
  console.log('removed');
}