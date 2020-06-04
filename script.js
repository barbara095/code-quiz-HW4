// Setting variables to DOM elements

var timerEl = document.querySelector("#time");
var startEl = document.querySelector("start");
var startBtn = document.querySelector("#start");
var titleEl = document.querySelector("#question-title")
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var answerBtn = document.querySelectorAll("btn-primary");
var scoresEl = document.querySelector("#final-score")
var finishDiv = document.querySelector("#finish");

var answerA = document.getElementById("#A");
var answerB = document.getElementById("#B");
var answerC = document.getElementById("#C");
var answerD = document.getElementById("#D");


var timeElapsed = 0;
var currentQuestion = 0;

// Set questions, choices and answers

var questionsArray = [
    {
        question: "Which javascript object allows us to ask a user a closed question? i.e: they can only answer 'yes' or 'no', 'true' or 'false.' ",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "booleans"
    },
    {
        question: "What is the main advantage of using jQuery over standard javascript?",
        choices: ["gives you wings", "simplifies DOM manipulation and event handling thus reducing the amount of lines needed to code", "allows you to debug elements quicker", "enables you to set and retrieve items from local storage"],
        answer: "simplifies DOM manipulation and event handling, thus reducing the amount of lines needed to code"
    },
    {
        question: "What is the difference between Math.ceil() and Math.floor()?",
        choices: ["Math.ceil() rounds a number up to the next largest integer, while Math.floor() returns the largest integer less than or equal to any given number", "Math.ceil() console logs a list from the highest to the lowest value, while Math.floor() console logs a list from lowest to highest"],
        answer: "Math.ceil() rounds a number up to the next largest integer, while Math.floor() returns the largest integer less than or equal to any given number"
    },
    {
        question: "True or false: A child function can access objects from its grandchild function",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        question: "In Javascript, what does a 'do, while' statement execute?",
        choices: ["executes a function until that function is true", "creates a loop that executes a statement until the condition outputs as 'false", "nothing, just sits there in the background as a distraction", "goes through an array until the last element of the array is shown"],
        answer: "creates a loop that executes a statement until the condition outputs as 'false' ",
    },
    {
        question: "How many columns does Bootstrap's grid system typically have?",
        choices: ["6", "8", "10", "12"],
        answer: "12",
    },

    {
        question: "Finish this sentence: children elements are only HTML elements, while a child element is______",
        choices: ["nothing", "only limited to ", "nothing, just sits there in the background as a distraction", "goes through an array until the last element of the array is shown"],
        answer: "creates a loop that executes a statement until the condition outputs as 'false' ",
    }
];

// hiding resultsDiv and highScoresDiv on page load
function init() {
    finishDiv.style.display = "none";
}
function startQuiz() {
    startEl.style.display = "none";
    startEl.setAttribute("class", "hide");

    // un-hide questions section
    questionsEl.removeAttribute("class");

    // start timer
    timerEl = setInterval(clockTick, 1000);

    // show starting time
    timerEl.textContent = timeElapsed;
}

function renderQuestion() {
    var questionDisplay = questionsArray[currentQuestion];
  
    questionDisplay.innerHTML = "<p>" + questionDisplay.question + "</p>";
    answerA.innerHTML = questionDisplay.choices[0];
    answerB.innerHTML = questionDisplay.choices[1];
    answerC.innerHTML = questionDisplay.choices[2];
    answerD.innerHTML = questionDisplay.choices[3];
  }

function setTimer() {
    setTime();

    // We only want to start the timer if the time = 0
    if (timerEl === 0) {
        /* The "interval" variable here using "setInterval()" begins the recurring increment of the
           secondsElapsed variable which is used to check if the time is up */
        interval = setInterval(function () {
            timeElapsed++;

            // So renderTime() is called here once every second.
            renderTime();
        }, 1000);
    }
}

//   Check answers
function checkAnswer(answer) {
    if (answer == questionsArray[question]) {
        // answer is correct, log 5 points to quizScore
        quizScore += 5;
    } else {
        // else if answer is incorrect, deduct 10 seconds from quizTimer
        timeElapsed -= 10;
    }
    // increases currentQuestion if less than lastQuestion and renders a new question
    if (currentQuestion < lastQuestion) {
        currentQuestion++;
        renderQuestion();
    } else {
        // end the quiz and show the resultsDiv
        stopTimer();
    }
}

function getQuestion() {
    // get current question object from array
    var currentQuestion = questionsArray[questionIndex];

    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;

    // clear out any old question choices
    choicesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function (choice, i) {
        // create new button for each choice
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + ". " + choice;

        // attach click event listener to each choice
        choiceNode.onclick = questionClick;

        // display on the page
        choicesEl.appendChild(choiceNode);
    });
}

function questionClick() {
    // check if user guessed wrong
    if (this.value !== questions[questionIndex].answer) {
        // penalize time
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        // display new time on page
        timerEl.textContent = time;

        // play "wrong" sound effect
        sfxWrong.play();

        feedbackEl.textContent = "Wrong!";
    } else {
        // play "right" sound effect
        sfxRight.play();

        feedbackEl.textContent = "Correct!";
    }

    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);

    // move to next question
    currentQuestionIndex++;

    // check if we've run out of questions
    if (currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd() {
    // stop timer
    clearInterval(timerId);

    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    // show final score
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function clockTick() {
    // update time
    time--;
    timerEl.textContent = time;

    // check if user ran out of time
    if (time <= 0) {
        quizEnd();
    }
}

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores =
            JSON.parse(window.localStorage.getItem("highscores")) || [];

        // format new score object for current user
        var newScore = {
            score: time,
            initials: initials
        };

        // save to localstorage
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        // redirect to next page
        window.location.href = "highscores.html";
    }
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveHighscore();
    }
}

// // user clicks button to submit initials
// submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// initialsEl.onkeyup = checkForEnter;

//   Event listeners
startBtn.addEventListener("click", startQuiz);
