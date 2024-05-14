/* Game Page */
document.addEventListener("DOMContentLoaded", function () {
    // Initializes the game by creating and shuffling the deck, and starting the game
  resetGame();
});

var resetBtn = document.getElementById("reset-game");
if (resetBtn !== null) {
    resetBtn.addEventListener("click", function () {
        // Reloads the page to reset the game
        resetGame();
      }); 
}


/* Setting default score for player and dealer */
let dealerScore = 0;
let playerScore = 0;
/* adding listener for aces in player/dealers deck */
let dealerAceCount = 0;
let playerAceCount = 0;

/* allows you to hit if your score is <= 21 */
let canHit = true;
/* creates empty deck array */
let deck;

/* variable for hidden card */
let hidden;
function resetGame() {
    dealerScore = 0;
    playerScore = 0;
    dealerAceCount = 0;
    playerAceCount = 0;
    canHit = true;
    document.getElementById('dealer-cards').innerHTML = `
    <img id="hidden" src="./assets/cards/Back.png" alt="hidden card">`
    document.getElementById('player-cards').innerHTML = ''
    document.getElementById("dealer-score").innerText = '';
    document.getElementById("player-score").innerText = '';
    document.getElementById("results").innerText = 'Result';
    createDeck();
    shuffleDeck();
    startGame();
}
/**
 * creates a deck of 52 cards combining values and suits
 */
function createDeck() {
  let cardValue = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];
  let cardSuit = ["C", "D", "H", "S"];
  deck = [];
  for (let x = 0; x < cardSuit.length; x++) {
    for (let y = 0; y < cardValue.length; y++) {
      deck.push(cardValue[y] + "-" + cardSuit[x]);
    }
  }
}

/**
 * iterates through the deck, assigning a random value in the deck to the current position in the deck
 */
function shuffleDeck() {
  for (let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length);
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
}
function startGame() {
  // checks if hidden dealer card is an ace card
  hidden = deck.pop();
  dealerScore += getValue(hidden);
  dealerAceCount += checkForAce(hidden);

  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./assets/cards/" + card + ".png";
  cardImg.alt = "Dealers card";
  dealerScore += getValue(card);
  // checks if each card added is an ace card
  dealerAceCount += checkForAce(card);
  document.getElementById("dealer-cards").append(cardImg);

  // deals the first two cards for the player
  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/cards/" + card + ".png";
    cardImg.alt = "Players card";
    playerScore += getValue(card);
    playerAceCount += checkForAce(card);
    document.getElementById("player-cards").append(cardImg);
  }
  // calls the hit, and stay functions when their associated buttons are pressed
  document.getElementById("hit").addEventListener("click", hit);
  document.getElementById("stay").addEventListener("click", stay);
}
function hit() {
  // checks if can hit is true or false, if false function ends.
  if (!canHit) {
    return;
  }
  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = "./assets/cards/" + card + ".png";
  cardImg.alt = "players card";
  playerScore += getValue(card);
  playerAceCount += checkForAce(card);
  document.getElementById("player-cards").append(cardImg);

  // if the player score is still over 21 after reducing any ace values than canHit becomes false.
  if (reduceAce(playerScore, playerAceCount) > 21) {
    canHit = false;
  }
}

function stay() {
  // while dealer score is less than 17, keep adding cards to dealer hand
  while (dealerScore < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./assets/cards/" + card + ".png";
    cardImg.alt = "Dealers card";
    dealerScore += getValue(card);
    // checks if each card added is an ace card
    dealerAceCount += checkForAce(card);
    document.getElementById("dealer-cards").append(cardImg);
  }

  // Reveal the hidden dealer card
  let hiddenCardImg = document.getElementById("hidden");
  hiddenCardImg.src = "./assets/cards/" + hidden + ".png";

  dealerScore = reduceAce(dealerScore, dealerAceCount);
  playerScore = reduceAce(playerScore, playerAceCount);

  canHit = false;

  let message = "";

  if (playerScore > 21) {
    message = "You Lose";
  } else if (dealerScore > 21) {
    message = "You Win";
  } else if (playerScore == dealerScore) {
    message = "Tie";
  } else if (playerScore > dealerScore) {
    message = "You Win";
  } else if (playerScore < dealerScore) {
    message = "You Lose";
  }

  // displaying dealer and player score after round ends
  document.getElementById("dealer-score").innerText = dealerScore;
  document.getElementById("player-score").innerText = playerScore;
  document.getElementById("results").innerText = message;
}

function getValue(card) {
  let data = card.split("-"); // splits the array into two seperate values, '4-C' into '4', 'C'
  let value = data[0]; // specifies the first value '4'

  /* checks if value is not a number, if value is == to 'A' then returns 11,
        else returns 10, meaning values like king, jack, or queen will be 10.
    */
  if (isNaN(value)) {
    if (value == "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkForAce(card) {
  if (card[0] == "A") {
    return 1;
  }
  return 0;
}

// Reduces ace value from 11 to 1 if playerScore exceeds 21
function reduceAce(playerScore, playerAceCount) {
  while (playerScore > 21 && playerAceCount > 0) {
    playerScore -= 10;
    playerAceCount -= 1;
  }
  return playerScore;
}

/* code inspired from 'https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal' */
/* code for the modal */
var modal = document.getElementById("rules-modal");
var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, it will close
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let rulesModalLink = document.getElementById("rules-modal-link");
rulesModalLink.addEventListener("click", function () {
  modal.style.display = "block";
});
