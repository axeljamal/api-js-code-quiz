//Define variables
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// Rules variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// Add sound effects for wrong/correct anwers
const audioCorrect = new Audio("./assets/sfx/correct.wav");
const audioIncorrect = new Audio("./assets/sfx/incorrect.wav");

function startQuiz() {
  // Hide start
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // Reveal questions
  questionsEl.removeAttribute("class");

  // Timer start
  timerId = setInterval(clockTick, 1000);

  // Display starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // Get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // Update with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // Clear out any previous question choices
  choicesEl.innerHTML = "";

  // Create loop on choices
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // Attach click event listener to each choice
    choiceNode.onclick = questionClick;

    // Append on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // Cheking if user answered wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // Minus time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "200%";

    // Play sound for incorrect answer
    audioIncorrect.play();
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "200%";

    // Play sound for correct answer
    audioCorrect.play();
  }

  // Show right/wrong feedback
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // Next question
  currentQuestionIndex++;

  // Check timer
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // Timer stop
  clearInterval(timerId);

  // Screen ends
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // Display final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // Question section hidden
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // Time updated
  time--;
  timerEl.textContent = time;

  // Return the timer checker
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // Retrieve value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // Retrieve saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // Format new score object for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // Add to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // Move to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  //Present the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// Submit initials
submitBtn.onclick = saveHighscore;

// Start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
