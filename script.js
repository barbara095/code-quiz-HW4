// Setting variables to DOM elements

var timerEl = document.querySelector("#time");
var introDiv = document.querySelector("#intro");
var startEl = document.querySelector("#start-screen");
var startBtn = document.querySelector("#start");
var qTitleEl = document.querySelector("#question-title")
var questionsEl = document.querySelector("#questions");
var choicesEl = document.querySelector("#choices");
var answerBtn = document.querySelectorAll("btn-primary");
var finalScore = document.querySelector("#final-score")
var finishDiv = document.querySelector("#finish");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.getElementById("initials");
var currentScore = document.querySelector("#current-score")

var choiceA = document.querySelector("#A");
var choiceB = document.querySelector("#B");
var choiceC = document.querySelector("#C");
var choiceD = document.querySelector("#D");

var currentQuestion = 0;
var secondsElapsed = 0;
var totalSeconds = 20;
// var quizTimer = 0;
var totalTimeTaken = 0;
var interval;
var score = 0;
var quizInProgress = true;

// Set questions, choices and answers

var questionsArray = [
    {
        number: 1,
        question: "Which javascript object allows us to ask a user a closed question? i.e: they can only answer 'yes' or 'no', 'true' or 'false.' ",
        choiceA: "strings",
        choiceB: "booleans",
        choiceC: "alerts",
        choiceD: "numbers",
        answer: "B",
    },
    {
        number: 2,
        question: "What is the main advantage of using jQuery over standard javascript?",
        choiceA: "gives you wings",
        choiceB: "simplifies DOM manipulation and event handling, thus reducing the amount of lines needed to code",
        choiceC: "allows you to debug elements quicker",
        choiceD: "enables you to set and retrieve items from local storage",
        answer: "B",
    },
    {
        number: 3,
        question: "What is the difference between Math.ceil() and Math.floor()?",
        choiceA: "Math.ceil() rounds a number up to the next largest integer, while Math.floor() returns the largest integer less than or equal to any given number",
        choiceB: "Math.ceil() console logs a list starting from the highest to the lowest value, while Math.floor() console logs a list from lowest to highest",
        choiceC: "All of these",
        choiceD: "None of these",
        answer: "A",
    },
    {
        number: 4,
        question: "True or false: A child function can access objects from its grandchild function",
        choiceA: "True",
        choiceB: "False",
        answer: "B"
    },
    {
        number: 5,
        question: "In Javascript, what does a 'do, while' statement execute?",
        choiceA: "executes a function until that function is true",
        choiceB: "creates a loop that executes a statement until the condition outputs as 'false",
        choiceC: "nothing, just sits there in the background as a distraction",
        choiceD: "goes through an array until the last element of the array is shown",
        answer: "B",
    },
    {
        number: 6,
        question: "How many columns does Bootstrap's grid system typically have?",
        choiceA: "6",
        choiceB: "8",
        choiceC: "10",
        choiceD: "12",
        answer: "D",
    },
    {
        number: 7,
        question: "Finish this sentence: children elements are only HTML elements, while a child element is______",
        choiceA: "nothing",
        choiceB: "only limited to its parent",
        choiceC: "nothing, just sits there in the background as a distraction",
        choiceD: "everything",
        answer: "B",
    }
];

var lastQuestion = questionsArray.length - 1;

init();

// hides finishDiv upon quiz commencement
function init() {
    finishDiv.style.display = "none";
}
function startQuiz() {

    // un-hide questions section
    questionsEl.removeAttribute("class");

    // hide start button
    startEl.style.display = "none";

    // start timer
    // timerEl = setInterval(clockTick, 1000);

    // show starting time
    timerEl.value = totalSeconds;

    getQuestion();
    clockTick();
}

function getQuestion() {
    // Set a variable that allows us to display each question, which is pulled from the questionsArray
    var questionDisplay = questionsArray[currentQuestion];
    // Loop each set of objects in the array
    for (var i = 0; i < questionsArray.length; i++) {
        // Display question in question title section
        qTitleEl.innerHTML = "<p>" + questionDisplay.question + "</p>";

        if (questionsArray[currentQuestion].number == 4) {
            choiceA.innerHTML = questionDisplay.choiceA;
            choiceB.innerHTML = questionDisplay.choiceB;
        } else {
            // Append choices from array to html text
            choiceA.innerHTML = questionDisplay.choiceA;
            choiceB.innerHTML = questionDisplay.choiceB;
            choiceC.innerHTML = questionDisplay.choiceC;
            choiceD.innerHTML = questionDisplay.choiceD;
        }
    }
}

function checkChoice(choice) {
    // check if user guessed wrong
    if (choice == questionsArray[currentQuestion].answer) {
        // this line just adds the time taken to total time taken for final calcuclation on score screen
        totalTimeTaken += 20 - totalSeconds;
        alert("Correct!");
        // If choice selected is correct, increment score by 6 points
        score += 6;
        totalSeconds = 20;
    } else {
        // this line just adds the time taken to total time taken for final calcuclation on score screen
        totalTimeTaken += 20 - totalSeconds;
        alert("Sorry, that is incorrect I'm afraid...");
        // Otherwise decrement time by 8 seconds
        secondsElapsed -= 8;
        totalSeconds = 20;
    }

    // If the index of the question displayed is less than the questionArray length, show the next question
    if ((currentQuestion) < (questionsArray.length)) {
        currentQuestion++;
        getQuestion();

    } else {
        // else ends the quiz and shows the resultsDiv
        stopTimer();
    }

    // setting new score on screen after every choice is selected
    currentScore.textContent = score

}

// Sets the quiz timer 
function setTimer() {

    //  Set time interval
    var timeInterval = setInterval(function () {
        totalSeconds--;
        setTime();
        // Clear interval once we reach 0
        if (totalSeconds === 0) {
            timerEl.textContent = "" + totalSeconds;
            clearInterval(timeInterval);
            // Reset back to 60 seconds
            totalSeconds = 60;
        }

    }, 1000);
}

// Sets the totalSeconds
function setTime() {
    // Clears the quizTimer
    clearInterval(timeInterval);
    totalSeconds = 20;
}

function clockTick() {
    timerEl.textContent = totalSeconds;
    // Increase seconds elapsed by 1
    var clockDecrement = setInterval(() => {
        totalSeconds--
        timerEl.textContent = totalSeconds;
        // check if user ran out of time 
        if (totalSeconds == 0) {
            totalTimeTaken += 20 - totalSeconds;
            // stop timer
            clearInterval(clockDecrement);

            // show end screen
            finishDiv.style.display = "block";

            // show final score
            finalScore = document.getElementById("final-score");
            finalScore.textContent = score;

            var timeTakenEl = document.getElementById("time-taken");
            timeTakenEl.textContent = totalTimeTaken;

            // hide questions section
            questionsEl.setAttribute("class", "hide");
        }
    }, 1000)

}

function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();

    // make sure value wasn't empty
    if (initials !== "") {
        // get saved scores from localstorage, or if not any, set to empty array
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

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

function quizEnd() {
    // I wasn't sure how to save the scores with the existing code you have in local storage, hope I helped until now.. :) 
    // I think you'd want to invoke a function here to save scores though.
    // show end screen
    finishDiv.removeAttribute("class");
    // show final score
    finalScore.textContent = time;
    // hide questions section
    questionsEl.setAttribute("class", "hide");
}

function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
        saveHighscore();
    }
}

//   Event listeners
startBtn.addEventListener("click", startQuiz);
choicesEl.addEventListener("click", getQuestion);
submitBtn.addEventListener("click", quizEnd);

