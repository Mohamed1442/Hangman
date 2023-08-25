////////////////////////////////////
// App Data
const words = ["application", "programming", "interface", "wizard"];
const chars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

let randomWord;
let numberOfTries = 0;
let matchingLettersArray = [];
let wrongLettersArray = [];
let timer;
////////////////////////////////////
const lettersContainer = document.querySelector(".letters-container");
const wrongLettersContainer = document.querySelector(
  ".wrong-letters-container"
);
const alertMessageElement = document.querySelector(".alert-message-box");
const wrongLettersElement = document.querySelector(".wrong-letters");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const playAgainBtn = document.querySelector(".play-again");
const gameParts = document.querySelectorAll(".figure-part");
let letterContainer;
////////////////////////////////////
// Main Functions

const generateRandomWord = () => {
  return [...words[Math.floor(Math.random() * words.length)].toLowerCase()];
};

const play = () => {
  // reset
  numberOfTries = 0;
  matchingLettersArray = [];
  wrongLettersArray = [];
  wrongLettersContainer.classList.add("hidden");
  wrongLettersElement.querySelector("span").textContent = "";
  gameParts.forEach((part) => {
    part.style.display = "none";
  });
  lettersContainer.innerHTML = "";
  // choose random word
  randomWord = generateRandomWord();

  randomWord.forEach((letter) => {
    lettersContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="letter"></div>`
    );
  });

  letterContainer = lettersContainer.querySelectorAll(".letter");
};

const generateWrongLettersText = () => {
  if (wrongLettersArray.length === 1) {
    return;
  }
};

const wrongLetter = (letter) => {
  if (wrongLettersArray.includes(letter)) {
    return alertRepeating();
  }
  wrongLettersArray.push(letter);

  if (numberOfTries === 0) {
    wrongLettersContainer.classList.remove("hidden");
  }
  wrongLettersElement.querySelector("span").textContent = [
    ...wrongLettersArray,
  ];
  gameParts[numberOfTries].style.display = "block";

  numberOfTries += 1;
  if (numberOfTries === gameParts.length) {
    showModal("Unfortunately you lost. 😕");
  }
};

const alertRepeating = () => {
  alertMessageElement.classList.add("translate");
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    alertMessageElement.classList.remove("translate");
  }, 1500);
};

const showModal = (message) => {
  backdrop.classList.remove("hidden");
  modal.classList.remove("hidden");
  modal.querySelector(".modal-message").textContent = message;
};

window.addEventListener("keydown", (e) => {
  const keyPressed = e.key.toLowerCase();
  const isChar = chars.includes(keyPressed);
  if (!isChar) return;

  if (matchingLettersArray.includes(keyPressed)) {
    return alertRepeating();
  }

  randomWord.forEach((letter, index) => {
    if (letter === keyPressed) {
      matchingLettersArray.push(letter);
      letterContainer[index].insertAdjacentHTML(
        "beforeend",
        `<span>${letter}</span>`
      );
    }
  });

  if (matchingLettersArray.length === randomWord.length) {
    showModal("Congratulations! You won! 😃");
  }

  if (!randomWord.includes(keyPressed)) {
    wrongLetter(keyPressed);
  }
});

playAgainBtn.addEventListener("click", () => {
  backdrop.classList.add("hidden");
  modal.classList.add("hidden");
  play();
});

const virtualKeyboard = document.querySelector(".base");

virtualKeyboard.addEventListener("click", (e) => {
  if (!e.target.classList.contains("key")) return;

  const keyPressed = e.target.textContent.toLowerCase();
  const isChar = chars.includes(keyPressed);
  if (!isChar) return;

  if (matchingLettersArray.includes(keyPressed)) {
    return alertRepeating();
  }

  randomWord.forEach((letter, index) => {
    if (letter === keyPressed) {
      matchingLettersArray.push(letter);
      letterContainer[index].insertAdjacentHTML(
        "beforeend",
        `<span>${letter}</span>`
      );
    }
  });

  if (matchingLettersArray.length === randomWord.length) {
    showModal("Congratulations! You won! 😃");
  }

  if (!randomWord.includes(keyPressed)) {
    wrongLetter(keyPressed);
  }
});
////////////////////////////////////
play();
