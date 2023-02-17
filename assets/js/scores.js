// Getting scores from localstorage or set to an empty array
function printHighscores() {
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // Added high score in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  // Adding li tag for each high score
  highscores.forEach(function (score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // Appending the high score on the page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

// Running function on loaded page
printHighscores();
