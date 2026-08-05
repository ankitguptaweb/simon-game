let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// =====================
// Start Game (PC + Mobile)
// =====================
function startGame() {
  if (!started) {
    started = true;
    levelUp();
  }
}

// PC
document.addEventListener("keydown", startGame);

// Mobile
document.addEventListener("touchstart", startGame);

// =====================
// Flash Effects
// =====================
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

// =====================
// Next Level
// =====================
function levelUp() {
  userSeq = [];
  level++;

  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameSeq.push(randColor);

  console.log(gameSeq);

  gameFlash(randBtn);
}

// =====================
// Check Answer
// =====================
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    if (level > highestScore) {
      highestScore = level;
    }

    h2.innerText = `Game Over!
Score: ${level}
Highest Score: ${highestScore}

Tap anywhere or press any key to restart`;

    reset();
  }
}

// =====================
// Button Click
// =====================
function btnPress() {

  // If first tap starts the game
  if (!started) {
    startGame();
    return;
  }

  let btn = this;

  userFlash(btn);

  let userColor = btn.getAttribute("id");

  userSeq.push(userColor);

  console.log(userSeq);

  checkAns(userSeq.length - 1);
}

// =====================
// Button Events
// =====================
let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// =====================
// Reset Game
// =====================
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}