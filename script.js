const quizData = {
  programming: [
    { q: "What does 'OOP' stand for?", options: ["Object-Oriented Programming", "Online Operation Protocol", "Only On Python", "Order of Operation"], answer: 0 },
    { q: "What is the output of 2 + '2' in JS?", options: ["4", "22", "NaN", "undefined"], answer: 1 },
    { q: "Which language is used for AI?", options: ["HTML", "Python", "CSS", "SQL"], answer: 1 },
    { q: "What is DSA?", options: ["Database Structure Algorithm", "Data Structure and Algorithm", "Digital Signal Architecture", "None"], answer: 1 },
    { q: "What is the time complexity of binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answer: 1 }
  ],
  web: [
    { q: "What does HTML stand for?", options: ["Hypertext Markup Language", "Hot Mail", "HyperText Markdown Language", "HighText Machine Language"], answer: 0 },
    { q: "CSS is used for?", options: ["Structuring", "Styling", "Scripting", "Security"], answer: 1 },
    { q: "Which tag is used for image?", options: ["<img>", "<pic>", "<image>", "<src>"], answer: 0 },
    { q: "What does JS stand for?", options: ["Java Server", "JavaScript", "JustScript", "None"], answer: 1 },
    { q: "Which attribute sets link target?", options: ["href", "src", "target", "alt"], answer: 2 }
  ],
  general: [
    { q: "Capital of India?", options: ["Delhi", "Mumbai", "Lucknow", "Jaipur"], answer: 0 },
    { q: "Largest planet?", options: ["Earth", "Saturn", "Jupiter", "Mars"], answer: 2 },
    { q: "Who wrote Ramayana?", options: ["Valmiki", "Tulsidas", "Kalidas", "Vyas"], answer: 0 },
    { q: "Currency of Japan?", options: ["Dollar", "Yuan", "Yen", "Won"], answer: 2 },
    { q: "Which gas do plants absorb?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: 1 }
  ]
};

let currentCategory = "";
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startScreen = document.getElementById("start-screen");
const scoreText = document.getElementById("score-text");
const badgeImg = document.getElementById("badge");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");
const questionCountEl = document.getElementById("question-count");

const clickSound = document.getElementById("click-sound");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const finishSound = document.getElementById("finish-sound");

document.getElementById("themeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});

function startQuiz(category) {
  clickSound.play();
  currentCategory = category;
  currentQuestion = 0;
  score = 0;
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  resetState();
  const data = quizData[currentCategory][currentQuestion];
  questionEl.innerText = data.q;
  data.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.innerText = opt;
    div.classList.add("option", "bounce-in");
    div.onclick = () => selectAnswer(index);
    optionsEl.appendChild(div);
  });
  questionCountEl.innerText = `${currentQuestion + 1}/${quizData[currentCategory].length}`;
  startTimer();
}

function resetState() {
  clearInterval(timer);
  timeLeft = 30;
  timerEl.innerText = timeLeft;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      wrongSound.play();
      showNextBtn();
    }
  }, 1000);
}

function selectAnswer(index) {
  clearInterval(timer);
  const correct = quizData[currentCategory][currentQuestion].answer;
  const options = document.querySelectorAll(".option");
  options.forEach((opt, i) => {
    opt.style.pointerEvents = "none";
    if (i === correct) opt.classList.add("correct");
    else if (i === index) opt.classList.add("wrong");
  });

  if (index === correct) {
    correctSound.play();
    score++;
  } else {
    wrongSound.play();
  }

  showNextBtn();
}

function showNextBtn() {
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  clickSound.play();
  currentQuestion++;
  if (currentQuestion < quizData[currentCategory].length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  finishSound.play();
  scoreText.innerText = `You scored ${score} out of ${quizData[currentCategory].length}`;

  if (score === quizData[currentCategory].length) {
    badgeImg.src = "assets/images/trophy.png";
  } else if (score >= 4) {
    badgeImg.src = "assets/images/gold.png";
  } else if (score >= 3) {
    badgeImg.src = "assets/images/silver.png";
  } else {
    badgeImg.src = "assets/images/bronze.png";
  }

}
