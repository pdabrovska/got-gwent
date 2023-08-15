import { houseLannisterCards, houseLannisterInfo, houseStarkInfo } from "../data/lannister-cards.js";
import {houseTargaryenCards, houseTargaryenInfo } from "../data/targaryen-cards.js";
import {displayCardsWheel, generateCardsCollectionMenu} from "./utils/cards-collection.js";

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
        <input type="radio" name="house" id="house-lannister" value="house-lannister">
        <label for="house-lannister">
          <img class="crest-radio-img" src="images/lannister-crest.jpg" alt="House Lannister">
        </label>
        <input type="radio" name="house" id="house-targaryen" value="house-targaryen">
        <label for="house-targaryen">
          <img class="crest-radio-img" src="images/targaryen-crest.jfif" alt="House Targaryen">
        </label>
      </div>
      <div class="choose-leader js-choose-leader"></div>
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
      console.log(0);
      chooseLeader(inputValue);
    } else {
      divElement.innerHTML ='';
      chooseLeader(inputValue);
    }
  });
  document.querySelector('#house-targaryen').addEventListener('click', () =>{
    const inputValue = document.querySelector('#house-targaryen').value;
    const divElement = document.querySelector('.js-choose-leader');
    if(divElement.innerHTML === ''){
      console.log(0);
      chooseLeader(inputValue);
    } else {
      divElement.innerHTML ='';
      chooseLeader(inputValue);
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
      <input class="leader" type="radio" name="leader" id="${id}" value="${id}">
        <label for="${id}">
          <div class="card card-wheel">
          <img class="card-wheel-img" src="images/cards-images/${img}">
          <div class="details-container">
            <p class="card-name">${name}</p>
            <p class="card-description">${description}</p>
          </div>
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
};