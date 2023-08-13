export function generateCardsCollection(cardsName, houseName, crest){
  let cardsHTML = '';
  let leadersHTML = '';

  cardsName.forEach((card, index) => {
    const {img, value, ability, abilityImg, typeImg, type} = card;

    if(type === 'leader'){
      const html = `
      <div class="card leader-card js-leader-card">
        <img class="card-image leader-card-img" src="images/cards-images/${img}">
      </div>
      `;

      leadersHTML += html;
    } else if(ability === ''){
      const html =  `
      <div class="card">
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
    }else {
      const html =  `
      <div class="card">
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
  });
  document.querySelector('.js-leaders-cards').innerHTML= leadersHTML;

  document.querySelector('.cards').innerHTML= cardsHTML;

  document.querySelector('.house-name').innerHTML = houseName;

  document.querySelector('.house-image-container').innerHTML = `<img class="fraction-img" src="images/${crest}">`

  document.querySelectorAll('.js-leader-card').forEach((leaderCard) =>{
    leaderCard.addEventListener('click', ()=>{
      document.querySelector('.js-cards-panel').innerHTML += 
      `<div class="cards-wheel js-cards-wheel"></div>`;
      const leadersCardsWheel = document.querySelector('.js-cards-wheel');
      let leadersWheelHTML = '';
      cardsName.forEach((card) =>{
        const {img, type} = card;

        if(type === 'leader'){
          const html = `
          <div class="card leader-card js-leader-card">
            <img class="card-image leader-card-img" src="images/cards-images/${img}">
          </div>
          `;

          leadersWheelHTML += html;
        }

        leadersCardsWheel.innerHTML = leadersWheelHTML;
      });
    });
  });
};

export function segregateCards(cardsName, selectedType){
  let cardsHTML = '';

  cardsName.forEach((card)=>{
    const{img, value, ability, abilityImg, type, typeImg} = card;
    if(type === selectedType){
      if(ability === ''){
        const html =  `
      <div class="card">
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
        <div class="card">
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
    };
  });

  document.querySelector('.cards').innerHTML= cardsHTML;
};

export function navigatingInFractions(direction, cardsCollection, houseTargaryenInfo, houseLannisterInfo, houseStarkInfo){
  const htmlElement = document.querySelector('.house-name');
    const fractionHouseName = htmlElement.innerHTML;
    let cardFractionInfo;

    if(fractionHouseName === 'House Targaryen'){
      cardFractionInfo = houseTargaryenInfo;
    } else if(fractionHouseName === 'House Lannister'){
      cardFractionInfo = houseLannisterInfo;
    } else if(fractionHouseName === 'House Stark'){
      cardFractionInfo = houseStarkInfo;
    } 

    const newCardCollectionIndex = cardsCollection.indexOf(cardFractionInfo) + direction;

    if(newCardCollectionIndex === cardsCollection.length -1){
      document.querySelector('.js-nav-right').classList.add('non-active-nav-button');
      document.querySelector('.js-nav-left').classList.remove('non-active-nav-button');
    }
    else if(newCardCollectionIndex === 0){
      document.querySelector('.js-nav-left').classList.add('non-active-nav-button');
      document.querySelector('.js-nav-right').classList.remove('non-active-nav-button');
    } else if((newCardCollectionIndex < 0) ||(newCardCollectionIndex >= cardsCollection.length)){
      return;
    } else{
      document.querySelector('.js-nav-right').classList.remove('non-active-nav-button');
      document.querySelector('.js-nav-left').classList.remove('non-active-nav-button');
    }
      const newCardCollection = cardsCollection[newCardCollectionIndex];
    const {cards, name, crest} = newCardCollection;
    generateCardsCollection(cards, name, crest);

    document.querySelector('.js-filter-all').addEventListener('click', ()=>{
      generateCardsCollection(cards, name, crest);
    });
  
    document.querySelector('.js-filter-sword').addEventListener('click', ()=>{
      segregateCards(cards, 'sword');
    });
  
    document.querySelector('.js-filter-bow').addEventListener('click', ()=>{
      segregateCards(cards, 'bow');
    });
  
    document.querySelector('.js-filter-catapult').addEventListener('click', ()=>{
      segregateCards(cards, 'catapult');
    });
};

export function generateCardsCollectionMenu(divElement, houseLannisterCards, cardsCollection, houseTargaryenInfo, houseLannisterInfo, houseStarkInfo){
  divElement.innerHTML = `
  <div class="cards-deck">
    <div class="fraction-menu">
      <p class="fraction-title">Fraction</p>
      <div class="fraction-wheel">
        <button class="nav-button js-nav-left">
          <img class="nav-img" src="images/icons/left-arrow.png">
        </button>
        <div class="fraction">
          <div class="house-image-container">
          </div>
          <div class="house-container">
            <p class="house-name"></p>
            <!--div class="dot-wheel">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div-->
          </div>
        </div>
        <button class="nav-button js-nav-right">
          <img class="nav-img" src="images/icons/right-arrow.png">
        </button>
      </div>
    </div>
    <div class="cards-panel js-cards-panel">
      <div class="leaders-menu">
        <p class="leaders-title">Leaders</p>
        <div class="js-leaders-cards leaders-cards"></div>
      </div>
      <div class="cards-menu">
        <div class="filters-container">
          <button class="filter-button js-filter-all">
            <img class="filter-img" src="images/icons/cards.png">
          </button>
          <button class="filter-button js-filter-sword">
            <img class="filter-img"  src="images/icons/sword.png">
          </button>
          <button class="filter-button js-filter-bow">
            <img class="filter-img"  src="images/icons/bow.png">
          </button>
          <button class="filter-button js-filter-catapult">
            <img class="filter-img"  src="images/icons/catapult.png">
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

 generateCardsCollection(houseLannisterCards, 'House Lannister', 'lannister-crest.jpg');

  document.querySelector('.js-filter-all').addEventListener('click', ()=>{
    generateCardsCollection(houseLannisterCards, 'House Lannister', 'lannister-crest.jpg');
  });

  document.querySelector('.js-filter-sword').addEventListener('click', ()=>{
    segregateCards(houseLannisterCards, 'sword');
  });

  document.querySelector('.js-filter-bow').addEventListener('click', ()=>{
    segregateCards(houseLannisterCards, 'bow');
  });

  document.querySelector('.js-filter-catapult').addEventListener('click', ()=>{
    segregateCards(houseLannisterCards, 'catapult');
  });

  document.querySelector('.js-nav-left').addEventListener('click', ()=>{
    navigatingInFractions(-1, cardsCollection, houseTargaryenInfo, houseLannisterInfo, houseStarkInfo);
  });

  document.querySelector('.js-nav-right').addEventListener('click', ()=>{
    navigatingInFractions(1, cardsCollection, houseTargaryenInfo, houseLannisterInfo, houseStarkInfo);
  });
};