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

      cardsHTML += html;
    }else {
      const html =  `
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

      cardsHTML += html;
    }
  });
  document.querySelector('.js-leaders-cards').innerHTML= leadersHTML;

  document.querySelector('.cards').innerHTML= cardsHTML;

  document.querySelector('.house-name').innerHTML = houseName;

  document.querySelector('.house-image-container').innerHTML = `<img class="fraction-img" src="images/${crest}">`

  document.querySelectorAll('.js-card').forEach((card) => {
    card.addEventListener('click', () => {
      console.log(0)
      document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
      document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
      displayCardsWheel(cardsName);
    });
  });

  document.querySelectorAll('.js-leader-card').forEach((leaderCard) => {
    leaderCard.addEventListener('click', () => {
      document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
      document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
      displayCardsWheel(cardsName, 'leader');
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

      cardsHTML += html;
      } else{
        const html =`
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

      cardsHTML += html;
      }
    };
  });

  document.querySelector('.cards').innerHTML= cardsHTML;
  document.querySelectorAll('.js-card').forEach((card) => {
    card.addEventListener('click', () => {
      console.log(0)
      document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
      displayCardsWheel(cardsName, selectedType);
    });
  });

  document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'q' || event.key === 'Q'){
      document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
      displayCardsWheel(cardsName, selectedType);
    }
  });
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
      document.body.addEventListener('keydown', (event) =>{
        if(event.key === 'q' || event.key === 'Q'){
          document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
          document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
          displayCardsWheel(cards);
        }
      });
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

    document.querySelectorAll('.js-leader-card').forEach((leaderCard) => {
      leaderCard.addEventListener('click', () => {
        document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
        document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
        displayCardsWheel(cards, 'leader');
      });
    });

    document.querySelectorAll('.js-card').forEach((card) => {
      card.addEventListener('click', () => {
        console.log(0)
        document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
        document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
        displayCardsWheel(cards);
      });
    });

    document.body.addEventListener('keydown', (event) =>{
      if(event.key === 'x' || event.key === 'X'){
        document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
        document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
        displayCardsWheel(cards, 'leader');
      }
      if(event.key === 'q' || event.key === 'Q'){
        document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
        document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
        displayCardsWheel(cards);
      }
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
      <div class="cards-wheel js-cards-wheel cards-wheel-non-active"></div>
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
    <div class="instructions">
      <p>X - leaders menu</p>
      <p>Q - cards menu</p>
      <p class="js-escape-button cards-wheel-non-active">Escape - close</p>
    </div>
  </div>
  `
 ;

 generateCardsCollection(houseLannisterCards, 'House Lannister', 'lannister-crest.jpg');

  document.querySelector('.js-filter-all').addEventListener('click', ()=>{
    generateCardsCollection(houseLannisterCards, 'House Lannister', 'lannister-crest.jpg');
    document.body.addEventListener('keydown', (event) =>{
      if(event.key === 'q' || event.key === 'Q'){
        document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
        document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
        displayCardsWheel(houseLannisterCards);
      }
    });
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
    document.querySelector('.js-cards-wheel').innerHTML = '';
    document.querySelector('.js-cards-wheel').classList.add('cards-wheel-non-active');
    document.querySelector('.js-escape-button').classList.add('cards-wheel-non-active');
  });

  document.querySelector('.js-nav-right').addEventListener('click', ()=>{
    navigatingInFractions(1, cardsCollection, houseTargaryenInfo, houseLannisterInfo, houseStarkInfo);
    document.querySelector('.js-cards-wheel').innerHTML = '';
    document.querySelector('.js-cards-wheel').classList.add('cards-wheel-non-active');
    document.querySelector('.js-escape-button').classList.add('cards-wheel-non-active');
  });

  document.querySelectorAll('.js-leader-card').forEach((leaderCard) => {
    leaderCard.addEventListener('click', () => {
      document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
      document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
      displayCardsWheel(houseLannisterCards, 'leader');
    });
  });

  document.querySelectorAll('.js-card').forEach((card) => {
    card.addEventListener('click', () => {
      document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
      document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
      displayCardsWheel(houseLannisterCards);
    });
  });

  document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'x' || event.key === 'X'){
      document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
      document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
      displayCardsWheel(houseLannisterCards, 'leader');
    }
    if(event.key === 'q' || event.key === 'Q'){
      document.querySelector('.js-cards-wheel').classList.remove('cards-wheel-non-active');
      document.querySelector('.js-escape-button').classList.remove('cards-wheel-non-active');
      displayCardsWheel(houseLannisterCards);
    }
    if(event.key === 'ArrowLeft'){
      navigatingInFractions(-1, cardsCollection, houseTargaryenInfo, houseLannisterInfo, houseStarkInfo);
      document.querySelector('.js-cards-wheel').innerHTML = '';
      document.querySelector('.js-cards-wheel').classList.add('cards-wheel-non-active');
      document.querySelector('.js-escape-button').classList.add('cards-wheel-non-active');
    }
    if(event.key === 'ArrowRight'){
      navigatingInFractions(1, cardsCollection, houseTargaryenInfo, houseLannisterInfo, houseStarkInfo);
      document.querySelector('.js-cards-wheel').innerHTML = '';
      document.querySelector('.js-cards-wheel').classList.add('cards-wheel-non-active');
      document.querySelector('.js-escape-button').classList.add('cards-wheel-non-active');
    }
  });
};


export function displayCardsWheel(cardsName, selectedType){
  let cardsWheelHTML ='';

  if(selectedType === 'leader'){
    cardsName.forEach((card)=>{
      const {img, type, name, description} = card;
      if(type === selectedType){
        const html = `
        <div class="card card-wheel">
            <img class="card-wheel-img" src="images/cards-images/${img}">
            <div class="details-container">
              <p class="card-name">${name}</p>
              <p class="card-description">${description}</p>
            </div>
        </div>
        `;
  
        cardsWheelHTML += html;
      }
    });
  } else if(selectedType === 'sword'){
    cardsName.forEach((card) =>{
      const {img, value, ability, abilityImg, typeImg, type, name, description} = card;
      if(type === selectedType && ability ===''){
        const html =  `
        <div class="card card-wheel js-card">
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
        cardsWheelHTML += html;
      }
      else if(type === selectedType){
        const html =  `
        <div class="card card-wheel js-card">
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
        cardsWheelHTML += html;
      }
    });
  } else if(selectedType === 'bow'){
    cardsName.forEach((card) =>{
      const {img, value, ability, abilityImg, typeImg, type, name, description} = card;
      if(type === selectedType && ability ===''){
        const html =  `
        <div class="card card-wheel js-card">
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
        cardsWheelHTML += html;
      }
      else if(type === selectedType){
        const html =  `
        <div class="card card-wheel js-card">
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
        cardsWheelHTML += html;
      }
    });
  } else if(selectedType === 'catapult'){
    cardsName.forEach((card) =>{
      const {img, value, ability, abilityImg, typeImg, type, name, description} = card;
      if(type === selectedType && ability ===''){
        const html =  `
        <div class="card card-wheel js-card">
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
        cardsWheelHTML += html;
      }
      else if(type === selectedType){
        const html =  `
        <div class="card card-wheel js-card">
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
        cardsWheelHTML += html;
      }
    });
  } else {
    cardsName.forEach((card)=>{
      const {img, value, ability, abilityImg, typeImg, type, name, description} = card;
      if(type !== 'leader' && ability ===''){
        const html =  `
        <div class="card card-wheel js-card">
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
        cardsWheelHTML += html;
      }
      else if(type !== 'leader'){
        const html =  `
        <div class="card card-wheel js-card">
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
        cardsWheelHTML += html;
      }
    });
  }

  document.querySelector('.js-cards-wheel').innerHTML = cardsWheelHTML;

  document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'Escape'){
      document.querySelector('.js-cards-wheel').innerHTML = '';
      document.querySelector('.js-cards-wheel').classList.add('cards-wheel-non-active');
      document.querySelector('.js-escape-button').classList.add('cards-wheel-non-active');
    }
  });
};