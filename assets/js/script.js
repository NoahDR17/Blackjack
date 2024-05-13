var gameLink = document.getElementById("game-link");

gameLink.addEventListener("click", function () {
  window.location.href = "game.html";
});

var rulesLink = document.getElementById("rules-link");

rulesLink.addEventListener("click", function () {
  window.location.href = "rules.html";
});

/* Game Page */
window.onload = function () {
  createDeck();
  shuffleDeck();
  startGame();
};
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
  console.log(deck);
}


function startGame() {}
function hit() {}
function stand() {}

function getValue() {
  let data = card.split("-"); // splits the array into two seperate values, '4-C' - '4', 'C'
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

function checkForAce() {
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
