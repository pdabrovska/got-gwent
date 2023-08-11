import { houseLannisterCards } from "../data/lannister-cards.js";

const buttonElementDecks = document.querySelector('.js-button-decks');

const divElement = document.querySelector('.action-screen');

buttonElementDecks.addEventListener('click', ()=>{
  divElement.innerHTML = `
  <div class="cards-deck">
    <div class="fraction-menu">
      <p class="fraction-title">Fraction</p>
      <div class="fraction-wheel">
        <button class="nav-button">
          <img class="nav-img" src="images/left-arrow.png">
        </button>
        <div class="fraction">
          <div class="house-container">
            <p class="house-name"></p>
            <div class="dot-wheel">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>
        <button class="nav-button">
          <img class="nav-img" src="images/right-arrow.png">
        </button>
      </div>
    </div>
    <div class="cards-panel">
      <div class="leaders-menu">
        <p class="leaders-title">Leaders</p>
        <div class="card leader-card">
          <img class="card-image leader-card-img" src="images/jaime-lannister.jpg">
          <span class="card-value-container">
            <p class="card-value">1</p>
          </span>
          <div class="card-attributes-container">
            <span class="card-ability">
              <img class="card-attribute-img" src="images/view.png">
            </span>
            <span class="card-type">
              <img class="card-attribute-img" src="images/bow.png">
            </span>
          </div>
        </div>
        <div class="card leader-card">
          <img class="card-image leader-card-img" src="images/jaime-lannister.jpg">
          <span class="card-value-container">
            <p class="card-value">1</p>
          </span>
          <div class="card-attributes-container">
            <span class="card-ability">
              <img class="card-attribute-img" src="images/view.png">
            </span>
            <span class="card-type">
              <img class="card-attribute-img" src="images/bow.png">
            </span>
          </div>
        </div>
      </div>
      <div class="cards-menu">
        <div class="filters-container">
          <button class="filter-button js-filter-all">
            <img class="filter-img" src="images/cards.png">
          </button>
          <button class="filter-button js-filter-sword">
            <img class="filter-img"  src="images/sword.png">
          </button>
          <button class="filter-button js-filter-bow">
            <img class="filter-img"  src="images/bow.png">
          </button>
          <button class="filter-button js-filter-catapult">
            <img class="filter-img"  src="images/catapult.png">
          </button>
        </div>
        <div class="cards">
          </div>
        </div>
      </div>
    </div>
  </div>
  `
 ;

 generateCardsCollection(houseLannisterCards, 'House Lannister', 'lannister');

  document.querySelector('.js-filter-sword').addEventListener('click', ()=>{
    console.log(1);
  });

  document.querySelector('.js-filter-bow').addEventListener('click', ()=>{
    console.log(1);
  });

  document.querySelector('.js-filter-catapult').addEventListener('click', ()=>{
    console.log(1);
  });
});

function generateCardsCollection(cardsName, houseName, crest){
  let cardsHTML = '';

  cardsName.forEach((card, index) => {
    const {img, value, ability, type} = card;
    const html =  `
    <div class="card">
      <img class="card-image" src="images/${img}">
      <span class="card-value-container">
        <p class="card-value">${value}</p>
      </span>
      <div class="card-attributes-container">
        <span class="card-ability">
          <img class="card-attribute-img" src="images/${ability}">
        </span>
        <span class="card-type">
          <img class="card-attribute-img" src="images/${type}">
        </span>
      </div>
    </div>
    `;

    cardsHTML += html;
  });

  const divElement = document.querySelector('.cards').innerHTML= cardsHTML;

  document.querySelector('.house-name').innerHTML = houseName;

  document.querySelector('.fraction').innerHTML += `<img class="fraction-img" src="images/${crest}-crest.jpg">`
};

function segregateCards(){
  houseLannisterCards.forEach((card)=>{

  });
}