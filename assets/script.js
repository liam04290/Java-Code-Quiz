// Define an array of questions and their respective answers
questions = [
    {
      question: "ABCD?",
      options: ["A", "B", "C", "D"],
      answer: "A"
    },
    {
      question: "1234?",
      options: ["1", "2", "3", "4"],
      answer: "1"
    },
    // Add questions here
  ];
  
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60; // Total time for the quiz in seconds
  
  questionElement = document.getElementById("question");
  optionsElement = document.getElementById("options");
  timerElement = document.getElementById("timer");
  
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
  
  // Handles user's answer
  function handleAnswer(event) {
    selectedAnswer = event.target.textContent;
    currentQuestion = questions[currentQuestionIndex];
  
    if (selectedAnswer === currentQuestion.answer) {
      score++;
    }
  
    // Move to next question or end quiz if no more questions
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  // Start quiz and initiate timer
  function startQuiz() {
    displayQuestion();
    startTimer();
  }
  
  // Start timer and update time remaining
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }
  
  // End quiz and display high scores
  function endQuiz() {
    // Prompt the user for their name or initials and store the score
    userName = prompt("Enter your name or initials:");
    highScore = { name: userName, score: score };
    // Store the high score in localStorage or sessionStorage for persistence
  
    // Update the high scores display
    highScoresElement = document.getElementById("high-scores");
    li = document.createElement("li");
    li.textContent = `${highScore.name}: ${highScore.score}`;
    highScoresElement.appendChild(li);
  }
  
  // Start the quiz when page loads or when start button is clicked
  window.addEventListener("DOMContentLoaded", startQuiz);
  