/* adding this if statement because there is no game link or rules link in game.html, 
or rules.html, which caused it to throw errors */
var gameLink = document.getElementById("game-link");
if (gameLink !== null) {
  // Redirects to the game page when the game link is clicked
  gameLink.addEventListener("click", function () {
    window.location.href = "game.html";
  });
}

var rulesLink = document.getElementById("rules-link");
if (rulesLink !== null) {
      // Redirects to the rules page when the rules link is clicked
  rulesLink.addEventListener("click", function () {
    window.location.href = "rules.html";
  });
}


