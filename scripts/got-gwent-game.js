import { houseLannisterCards} from "../data/lannister-cards.js";
import {houseTargaryenCards} from "../data/targaryen-cards.js";

window.addEventListener('beforeunload', function (event) {
  event.preventDefault();
  event.returnValue = 'Are you sure you want to leave this page?';
});

displayPlayerLeader();

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
      console.log(10);
      document.querySelector('.js-profile-img').innerHTML =`
      <img class="profile-image" src="images/cards-images/${img}">
      `;
    }
  });
}