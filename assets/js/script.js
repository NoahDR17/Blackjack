var gameLink = document.getElementById("game-link");

gameLink.addEventListener("click", function () {
    window.location.href = "game.html";});

var rulesLink = document.getElementById("rules-link");

rulesLink.addEventListener("click", function () {
    window.location.href = "rules.html";});

/* Game Page */
window.onload = function() {
    createDeck();
    shuffleDeck();
    startGame();
}
/* Setting default score for player and dealer */
let dealerScore = 0;
let playerScore = 0;

/* allows you to hit if your score is <= 21 */
let canHit = true; 
/* creates empty deck array */
let deck;

/**
 * creates a deck of 52 cards combining values and suits
 */
function createDeck() {
let cardValue = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
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
    console.log(deck)
}

let dealerAceCount = 0;
let yourAceCount = 0; 

function startGame() {

}
function hit() {

}
function stand() {

}

function getValue() {
    
}
