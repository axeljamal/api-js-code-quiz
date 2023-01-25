const startBtn = document.querySelector('#start');
const startSection = document.getElementById('start-screen');
const questionTitle = document.getElementById('question-title');
const choices = document.getElementById('choices');
const questionDiv = document.getElementById('questions');

let questionNumber = 0;

function startQuiz(event) {
  startSection.style.display = 'none';

  questionDiv.className = "";

  questionTitle.textContent = questions[0].question;

  questions[0].choice.forEach(function (singleChoice) {
    const item = document.createElement('p');
    item.textContent = singleChoice;
    choices.appendChild(item);
  });

  questionNumber++;

  const nextBtn = document.createElement('button');
  nextBtn.textContent = "Next";
  questionDiv.appendChild(nextBtn);

}

startBtn.addEventListener("click", startQuiz);