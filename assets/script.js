// globally declared variables.
var startButton = document.querySelector("#start");
var questionScreen = document.querySelector("#questions");
var questionPool = 0;
var theChoices = document.querySelector("#choices");
var endScreen = document.querySelector("#end-screen");
var finalScore = 0;
var correct = document.querySelector("#correct");
var wrong = document.querySelector("#wrong");
var counter = 75;
var theTimer = document.querySelector("#time");
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var displayScore = document.querySelector("#final-Score");
var scoreBoard = document.querySelector("#score-board");
var scoreLink = document.querySelector("#score");


startButton.onclick = startQuiz;


function gameTimer() {
  var timeInterval = setInterval(function () {
    counter--;
    theTimer.textContent = counter;

    if (counter <= 0 || questionPool === questions.length - 1) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

function startQuiz() {
  gameTimer();
  var startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "hide");
  questionScreen.removeAttribute("class");
  getQuestion();
}


function getQuestion() {
  var currentQuestion = questions[questionPool];
  var questionTitle = document.querySelector("#question-title");
  questionTitle.textContent = currentQuestion.title;


  for (var i = 0; i < currentQuestion.choice.length; i++) {
    var userChoice = document.createElement("button");
    userChoice.setAttribute("class", "choice");
    userChoice.setAttribute("value", currentQuestion.choice[i]);
    userChoice.textContent = i + 1 + ". " + currentQuestion.choice[i];
    theChoices.appendChild(userChoice);

    
    userChoice.onclick = checkAnswer;
  }
  
  function checkAnswer(event) {
    var userAnswer = event.target.value;
    console.log(userAnswer);
    
    if (userAnswer === questions[questionPool].answer) {
      correct.removeAttribute("class");
      wrong.setAttribute("class", "hide");
      
    } else {
      wrong.removeAttribute("class");
      correct.setAttribute("class", "hide");
      
      counter -= 10;
    }

   
    theChoices.innerHTML = "";

   
    questionPool++;

    
    if (questionPool === questions.length - 1) {
      correct.setAttribute("class", "hide");
      wrong.setAttribute("class", "hide");
      gameOver();
    } else {
      setTimeout(function () {
        correct.setAttribute("class", "hide");
        wrong.setAttribute("class", "hide");
        getQuestion();
      }, 1000);
    }
  }
}


function gameOver() {
  questionScreen.setAttribute("class", "hide");
  endScreen.removeAttribute("class");
  finalScore = counter;
  document.getElementById("final-score").innerHTML = finalScore;
  theTimer.textContent = counter;
  document.getElementById("time").textContent = 0;

  // clearInterval(timeInterval);
}


submit.onclick = getScore;

function getScore() {
  var initials = document.getElementById("initials").value.trim();
  var userScore = { score: finalScore, initials: initials };
  highscores.push(userScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
}