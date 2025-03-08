const buttonColours = ["red", "blue", "green", "yellow"];
const body = $("body");
const heading = $("h1");
const buttons = $(".btn");
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

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
  body.addClass(`game-over`);
  setTimeout(() => {
    body.removeClass(`game-over`);
  }, 200);
}

function animateChosenBtn(colour) {
  $(`#${colour}`).fadeOut(50).fadeIn(50);
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  heading.text(`Level ${level}`);
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animateChosenBtn(randomChosenColour);
  playSound(randomChosenColour);
}

function startNextLevel() {
  setTimeout(nextSequence, 1000);
}

function gameOver() {
  playSound(`wrong`);
  animateGameOver();
  heading.text("Game Over, Press Any Key To Restart");
}

function resetGame() {
  level = 0;
  gamePattern = [];
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      startNextLevel();
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

body.one("keydown", () => {
  nextSequence();
});
