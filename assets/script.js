// Define an array of questions and their respective answers
questions = [
    {
      question: "Which of the following methods can be used to display data in some form using Javascript?",
      options: ["document.write", "console.log", "window.alert", "All of the above"],
      answer: "All of the above"
    },
    {
      question: "Which of the following keywords is used to define a variable in Javascript?",
      options: ["var", "let", "Both A and B", "None of the above"],
      answer: "Both A and B"
    },
    {
      question: "Javascript is an _______ language?",
      options: ["Object-Oriented", "Object-Based", "Procedural", "None of the above"],
      answer: "Object-Oriented"
    },
    {
      question: "Which of the following methods is used to access HTML elements using Javascript?",
      options: ["getElementbyId()", "getElementsByClassName()", "Both A and B", "None of the above"],
      answer: "Both A and B"
    },
    {
      question: "What will be the output of the following code snippet? 'print(typeof(NaN));'",
      options: ["Object", "Number", "String", "None of the above"],
      answer: "Number"
    }
  ];
  
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60; // Total time for the quiz in seconds
  
  questionElement = document.getElementById("question");
  optionsElement = document.getElementById("options");
  timerElement = document.getElementById("timer");
  // Hide timer initially
  timerElement.style.display = "none";
  // Hide questions initially
  questionElement.style.display = "none1"
  
  // Displays current question and answer options
  function displayQuestion() {
    currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach(option => {
      li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", handleAnswer);
      optionsElement.appendChild(li);
    });
  }

  var startBtn = document.getElementById("start-btn");
  var feedbackElement = document.getElementById("feedback");
  var questionContainerElement = document.getElementById("question-container");

    // Start quiz and initiate timer
  function startQuiz() {
    // Reset time left and current question index
    timeLeft = 60;
    currentQuestionIndex = 0;
    score = 0;
    // Reset timer
    timerElement.textContent = timeLeft;
    // Show timer
    timerElement.style.display = "block";

    displayQuestion();

    // Clear any timers
    clearInterval(timer);
    startTimer();

    // Display Questions
    questionContainerElement.style.display = "block";
  }
  

// Handles user's answer
function handleAnswer(event) {
  selectedAnswer = event.target.textContent;
  currentQuestion = questions[currentQuestionIndex];

  // Score up and move to next question if answer is correct
  if (selectedAnswer === currentQuestion.answer) {
    score++;
    // Move to next question or end quiz if no more questions
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  } else {
    // Subtract 10 seconds if answer is wrong
    timeLeft -= 10; // Subtract 10 as you specified in your feedback message
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timerElement.textContent = timeLeft;

    // Display wrong answer feedback
    feedbackElement.textContent = "WRONG -10 seconds";
    setTimeout(() => {
      feedbackElement.textContent = "";
    }, 1000);
  }
}

// Start quiz when button is clicked
startBtn.addEventListener("click", startQuiz);
  
// Start timer and update time remaining
function startTimer() {
// Clear any existing interval to avoid overlapping intervals
clearInterval(timer);
  timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz();
    }
  }, 1000);
}

  // End quiz and display high scores
  function endQuiz() {
    // Clear timer when quiz ends
    clearInterval(timer);

    // Prompt the user for their name or initials and store the score
    userName = prompt("Enter your name or initials:");
    highScore = { name: userName, score: score };

    // Get high scores from localStorage or set to empty array
    var highScores = JSON.parse(localStorage.getItem("high-scores")) || [];

    // Push new high score to highScores array
    highScores.push(highScore);

    // Save highScores array to localStorage
    localStorage.setItem("high-scores", JSON.stringify(highScores));

    // Update the high scores display
    highScoresElement = document.getElementById("high-scores");
    li = document.createElement("li");
    li.textContent = `${highScore.name}: ${highScore.score}`;
    highScoresElement.appendChild(li);

    // Hide question container
    questionContainerElement.style.display = "none";
  }
  
  // Start the quiz when start button is clicked
 // window.addEventListener("DOMContentLoaded", startQuiz);
  