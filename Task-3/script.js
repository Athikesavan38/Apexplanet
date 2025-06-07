const quizzes = {
  webdev: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Preprocessor",
        "Hyper Text Markup Language",
        "Hyper Text Multiple Language",
        "Hyper Tool Multi Language"
      ],
      answer: 1
    },
    {
      question: "Which JavaScript method is used to select an element by its ID?",
      options: [
         "document.querySelector()",
      "document.getElementsByClassName()",
      "document.getElementById()",
      "document.getElementsByTagName()"
    ],
      answer: 2
    },
    {
      question: "Which of the following is a JavaScript data type?",
      options: [
        "Number",
        "Character",
        "Boolean",
        "Both Number and Boolean"
      ],
      answer: 3
    },
    {
      question: "What is a closure in JavaScript?",
      options: ["A function inside another function that preserves the outer scope", "A way to close browser tabs automatically", "A JavaScript object property", "A loop that never ends"],
      answer: 0
    },
    
    {
      question: "Which method converts JSON to a JavaScript object?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toObject()"],
      answer: 3
    }
  ],
  css: [
    {
      question: "What does CSS stand for?",
      options: [
        "Common Style Sheet",
        "Cascading Style Sheet",
        "Colorful Style Sheet",
        "Computer Style Sheet"
      ],
      answer: 1
    },
    {
      question: "Which property is used to change the background color?",
      options: ["color", "bg-color", "background-color", "backgroundColor"],
      answer: 2
    },
    {
      question: "How do you make each word in a text start with a capital letter using CSS?",
      options: [
        "text-transform: capitalize;",
        "text-style: capitalize;",
      "transform: capitalize;",
      "text-capitalize: true;"],
      answer: 0
    },
    {
      question: "How do you select an element with the id 'header' in CSS?",
      options: [".header",
      "#header",
      "header",
      "*header"
    ],
      answer: 1
    },
    {
      question: "Which CSS property controls the text size?",
      options: ["text-size",
      "font-weight",
      "font-size",
      "text-style"],
      answer: 2
    }
  ],
  py: [
    {
      question: "Which of the following is a correct variable declaration in Python?",
      options: [
        "my-var = 10",
      "my_var = 10",
      "var my_var = 10",
      "int my_var = 10"
      ],
      answer: 1
    },
    {
      question: "What is the output of: print(type(3.14))?",
      options: ["<class 'int'>",
      "<class 'str'>",
      "<class 'float'>",
      "<class 'double'>"],
      answer: 2
    },
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function",
      "func",
      "def",
      "define"],
      answer: 2
    },
    {
      question: "How do you insert comments in Python code?",
      options: [ "Using # at the beginning",
      "Using <!-- -->",
      "Using // at the beginning",
      "Using /* */"],
      answer: 0
    },
    {
      question: "What is the correct syntax to create a list in Python?",
      options: [ "(1, 2, 3, 4)",
        "<1, 2, 3, 4>",
        "{1, 2, 3, 4}",
        "[1, 2, 3, 4]"
    ],
      answer: 3
    }
  ]
};

let questions = [];
let selectedQuiz = "";
let currentQuestion = 0;
let userAnswers = [];
let timerInterval = null;
const TIME_LIMIT = 15; 
let timeLeft = TIME_LIMIT;

// DOM Elements
const categorySelector = document.getElementById('category-selector');
const quizContent = document.getElementById('quiz-content');
const questionText = document.getElementById('question-text');
const answersList = document.getElementById('answers-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBarFill = document.getElementById('progress-bar-fill');
const resultDiv = document.getElementById('result');
const scoreSpan = document.getElementById('score');
const totalQuestionsSpan = document.getElementById('total-questions');
const restartBtn = document.getElementById('restart-btn');
const reviewList = document.getElementById('review-list');
const questionContainer = document.getElementById('question-container');
const timerDisplay = document.getElementById('timer');
const toggleReviewBtn = document.getElementById('toggle-review');
const reviewSection = document.getElementById('review');
const congratsMessage = document.getElementById('congrats-message');

function selectQuiz(topic) {
  selectedQuiz = topic;
  questions = quizzes[topic];
  userAnswers = new Array(questions.length).fill(null);
  categorySelector.style.display = "none";
  quizContent.style.display = "block";
  currentQuestion = 0;
  resultDiv.style.display = 'none';
  prevBtn.style.display = '';
  nextBtn.style.display = '';
  congratsMessage.style.display = 'none';
  reviewSection.classList.remove('hidden');
  toggleReviewBtn.textContent = 'Hide Review';
  renderQuestion();
}

function renderQuestion() {
  // Reset timer
  resetTimer();

  questionContainer.classList.add('fade-out');

  setTimeout(() => {
    questionText.textContent = questions[currentQuestion].question;

    // Clear previous answers
    answersList.innerHTML = '';

    // Render answer options
    questions[currentQuestion].options.forEach((option, index) => {
      const li = document.createElement('li');
      li.textContent = option;
      li.dataset.index = index;

      // Mark selected if any
      if (userAnswers[currentQuestion] === index) {
        li.classList.add('selected');
      }

      li.onclick = () => {
        userAnswers[currentQuestion] = index;
        updateSelected();
        updateNextButton();
        updateProgressBar();
      };

      answersList.appendChild(li);
    });

    // Update buttons
    prevBtn.disabled = currentQuestion === 0;
    updateNextButton();

    // Update progress bar
    updateProgressBar();

    // Animate fade in
    questionContainer.classList.remove('fade-out');

    startTimer();
  }, 300);
}

function updateSelected() {
  const lis = answersList.querySelectorAll('li');
  lis.forEach(li => {
    li.classList.remove('selected');
    if (parseInt(li.dataset.index) === userAnswers[currentQuestion]) {
      li.classList.add('selected');
    }
  });
}

function updateNextButton() {
  nextBtn.disabled = userAnswers[currentQuestion] === null;
  if (currentQuestion === questions.length - 1) {
    nextBtn.textContent = "Submit";
  } else {
    nextBtn.textContent = "Next";
  }
}

function updateProgressBar() {
  let progressPercent = ((currentQuestion + 1) / questions.length) * 100;
  progressBarFill.style.width = progressPercent + '%';
}

prevBtn.onclick = () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
};

nextBtn.onclick = () => {
  if (userAnswers[currentQuestion] === null) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    stopTimer();
    showResults();
  }
};

restartBtn.onclick = () => {
  stopTimer();
  categorySelector.style.display = "block";
  quizContent.style.display = "none";
  selectedQuiz = "";
  questions = [];
  userAnswers = [];
  currentQuestion = 0;
  resultDiv.style.display = "none";
  progressBarFill.style.width = '0%';
  congratsMessage.style.display = 'none';
};

toggleReviewBtn.onclick = () => {
  if (reviewSection.classList.contains('hidden')) {
    reviewSection.classList.remove('hidden');
    toggleReviewBtn.textContent = 'Hide Review';
  } else {
    reviewSection.classList.add('hidden');
    toggleReviewBtn.textContent = 'Show Review';
  }
};

// Timer functions
function startTimer() {
  timeLeft = TIME_LIMIT;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      // Auto move to next or submit
      if (userAnswers[currentQuestion] === null) {
        // Mark as unanswered so user can't skip timer without answer
        userAnswers[currentQuestion] = null;
      }
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
      } else {
        showResults();
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = TIME_LIMIT;
  updateTimerDisplay();
}

function stopTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent = "";
}

function updateTimerDisplay() {
  timerDisplay.textContent = `${timeLeft}s`;
  if (timeLeft <= 5) {
    timerDisplay.style.background = '#f44336'; 
  } else {
    timerDisplay.style.background = '#007bff';
  }
}

function showResults() {
  stopTimer();
  questionContainer.style.display = 'none';
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';

  // Calculate score
  let score = 0;
  userAnswers.forEach((answer, index) => {
    if (answer === questions[index].answer) score++;
  });

  scoreSpan.textContent = score;
  totalQuestionsSpan.textContent = questions.length;

  // Show review of answers
  reviewList.innerHTML = '';
  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'review-item';

    const userAnswerIndex = userAnswers[index];
    const isCorrect = userAnswerIndex === q.answer;
    if (!isCorrect) div.classList.add('incorrect');

    div.innerHTML = `
        <strong>Q${index + 1}:</strong> ${q.question}<br />
        <span class="review-answer">
          Your answer: <span class="${isCorrect ? 'correct-answer' : 'incorrect-answer'}">${userAnswerIndex !== null ? q.options[userAnswerIndex] : '<em>Not answered</em>'}</span><br />
          Correct answer: <span class="correct-answer">${q.options[q.answer]}</span>
        </span>
      `;

    reviewList.appendChild(div);
  });

  resultDiv.style.display = 'block';
  congratsMessage.style.display = 'block';
  progressBarFill.style.width = '100%';
}

