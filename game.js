const buttonColours = ["red", "blue", "green", "yellow"];
const body = $("body");
const heading = $("h1");
const buttons = $(".btn");
const score = $("#current-score");
const bestScore = $("#highest-score");
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let currentScore = 0;
let highestScore = localStorage.getItem("highestScore") || 0;

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  const btn = $(`#${currentColour}`);
  btn.addClass(`pressed`);
  setTimeout(() => {
    btn.removeClass(`pressed`);
  }, 100);
}

function animateGameOver() {
  heading.text("Game Over, Press Any Key To Restart");
  body.addClass(`game-over`);
  setTimeout(() => {
    body.removeClass(`game-over`);
  }, 200);
}

function animateChosenBtn(colour) {
  $(`#${colour}`).fadeOut(50).fadeIn(50);
}

function nextSequence() {
  level++;
  userClickedPattern = [];
  heading.text(`Level ${level}`);
  const randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  animateChosenBtn(randomChosenColour);
  playSound(randomChosenColour);
}

function advanceToNextLevel() {
  setTimeout(nextSequence, 1000);
}

function gameOver() {
  playSound(`wrong`);
  animateGameOver();
  
}

function displayScores(){
  score.text(currentScore);
  bestScore.text(highestScore);
}

function resetGame() {
  if(currentScore > highestScore){
    highestScore = currentScore;
    localStorage.setItem("highestScore", highestScore);
  }
  currentScore = 0;
  displayScores();
  level = 0;
  gamePattern = [];
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      currentScore++
      displayScores();
      advanceToNextLevel();
    }
  } else {
    gameOver();
    body.one("keydown", () => {
      resetGame();
      nextSequence();
    });
  }
}

buttons.click((e) => {
  const userChosenColour = e.currentTarget.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

displayScores();
body.one("keydown", nextSequence);
