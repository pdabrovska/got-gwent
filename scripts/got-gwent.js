import { houseLannisterCards, houseLannisterInfo, houseStarkInfo } from "../data/lannister-cards.js";
import {houseTargaryenInfo } from "../data/targaryen-cards.js";
import { generateCardsCollection, segregateCards, navigatingInFractions, generateCardsCollectionMenu} from "./utils/cards-collection.js";

const cardsCollection = [houseStarkInfo,houseLannisterInfo, houseTargaryenInfo];

const buttonElementDecks = document.querySelector('.js-button-decks');

const divElement = document.querySelector('.action-screen');

buttonElementDecks.addEventListener('click', ()=>{
  generateCardsCollectionMenu(divElement, houseLannisterCards, cardsCollection, houseTargaryenInfo, houseLannisterInfo, houseStarkInfo);
});