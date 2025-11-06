const allQuestions = [
  {
    question: "Which language is used for web apps?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Java", correct: false }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Highlevel Text Markup Language", correct: false }
    ]
  },
  {
    question: "Which tag is used for inserting a line break in HTML?",
    answers: [
      { text: "<break>", correct: false },
      { text: "<lb>", correct: false },
      { text: "<br>", correct: true },
      { text: "<line>", correct: false }
    ]
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<script>", correct: true },
      { text: "<scripting>", correct: false },
      { text: "<javascript>", correct: false }
    ]
  },
  {
    question: "Which of these is a JavaScript framework?",
    answers: [
      { text: "React", correct: true },
      { text: "Laravel", correct: false },
      { text: "Django", correct: false },
      { text: "Flask", correct: false }
    ]
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "#", correct: false },
      { text: "/* */", correct: false },
      { text: "<!-- -->", correct: false }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Colorful Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false }
    ]
  },
  {
    question: "Which property is used to change the background color in CSS?",
    answers: [
      { text: "bgcolor", correct: false },
      { text: "background-color", correct: true },
      { text: "color-background", correct: false },
      { text: "background-style", correct: false }
    ]
  },
  {
    question: "Which Java keyword is used to create an object?",
    answers: [
      { text: "class", correct: false },
      { text: "this", correct: false },
      { text: "new", correct: true },
      { text: "create", correct: false }
    ]
  },
  {
    question: "Which data type is used to store a single character in Java?",
    answers: [
      { text: "String", correct: false },
      { text: "char", correct: true },
      { text: "Character", correct: false },
      { text: "int", correct: false }
    ]
  },
  {
    question: "Which company developed Java?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Sun Microsystems", correct: true },
      { text: "Apple", correct: false },
      { text: "Google", correct: false }
    ]
  },
  {
    question: "Which HTML tag is used to display an image?",
    answers: [
      { text: "<img>", correct: true },
      { text: "<image>", correct: false },
      { text: "<pic>", correct: false },
      { text: "<src>", correct: false }
    ]
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "font-style", correct: false },
      { text: "text-size", correct: false },
      { text: "font-size", correct: true },
      { text: "text-style", correct: false }
    ]
  },
  {
    question: "What year was JavaScript created?",
    answers: [
      { text: "1990", correct: false },
      { text: "1995", correct: true },
      { text: "2000", correct: false },
      { text: "1989", correct: false }
    ]
  },
  {
    question: "Who is known as the father of Java programming language?",
    answers: [
      { text: "James Gosling", correct: true },
      { text: "Guido van Rossum", correct: false },
      { text: "Bjarne Stroustrup", correct: false },
      { text: "Dennis Ritchie", correct: false }
    ]
  }
];

// Shuffle and select 5 random questions
function getRandomQuestions() {
  let shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
}

let questions = getRandomQuestions();
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  questions = getRandomQuestions();
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerText = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    optionsElement.appendChild(button);
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(optionsElement.children).forEach(button => {
    if (button.dataset.correct === "true") button.classList.add("correct");
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerText = `🎉 You scored ${score} out of ${questions.length}!`;
  nextButton.innerText = "Restart Quiz";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) showQuestion();
  else showScore();
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) handleNextButton();
  else startQuiz();
});

startQuiz();
