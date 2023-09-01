export function instructions(){
  return `
  <div class="instructions-container">
          <div class="opening">
            <p>Introduction</p>
            <p>
              The inspiration for this project were two great brands - 'The Witcher' and 'Game of Thrones'. Game of Thrones Gwent is not a commercial project.<br><br>
              Gwent is a game where two armies lock in mortal struggle on the field of battle. The goal is to win two battles against the opponent. Wins are tallied in crowns, shown to the left of each player's field strength. With each defeat opponent loses one crown (and so do you).
            </p>
            <p>Rules</p>
            <p>
              &#8226 Each player picks minimum 10 cards.<br>
              &#8226 At the start of match players will be given 5 random cards from the 10 they chose earlier.<br>
              &#8226 Before the match begins, player may choose to return up to two cards.<br>
              &#8226 The player, whose two golden crowns turn black first, loses.<br>
              &#8226 Each card has its value. Player points are the sum of cards on battlefield' values.<br>
            </p>

            <div class="images">
              <img id="player-instruction" src="images/player-panel-instruction.png">
              <img id="card-instruction" src="images/card-instruction.png">
            </div>

            <div class="abilities">
              <p>Abilities:</p>
              <div class="ability">
                <div class="ability-img">
                  <img src="images/icons/abilities-icons/bond.png">
                </div>
                <p>Place next to a card with the same name to double the strength of both</p>
              </div>
              <div class="ability">
                <div class="ability-img spy">
                  <img src="images/icons/abilities-icons/spy.png">
                </div>
                <p>Place on your opponent's battlefied(counts towards your opponent's total) and draw 2 cards from your deck</p>
              </div>
              <div class="ability">
                <div class="ability-img">
                  <img src="images/icons/abilities-icons/group.png">
                </div>
                <p>Goes through your deck, finds any cards with the same name and plays them immediately</p>
              </div>
            </div>
            <p>Tips</p>
            <p>
              &#8226 Sometimes its better to pass the round, and let the opponent win.<br>
            </p>
          </div>
        </div>
  `;
};