let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

document.querySelector("body").addEventListener("keydown", (event) => {
  if (event.key === "r" || event.key === "R") {
    playGame("rock");
  } else if (event.key === "p" || event.key === "P") {
    playGame("paper");
  } else if (event.key === "s" || event.key === "S") {
    playGame("scissors");
  } else if (event.key === "a" || event.key === "A") {
    autoPlay();
  } else if (event.key === "Backspace") {
    showResetConfirmation();
  }
});

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document
  .querySelector(".js-reset-score-button")
  .addEventListener("click", () => {
    showResetConfirmation();
  });

document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoPlay();
});

function showResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = `
            <p>
              Are you sure you want to reset the score?
              <button class="js-reset-confirm-yes reset-confirm-button">Yes</button> 
              <button class="js-reset-confirm-no reset-confirm-button">No</button> 
            </p>
          `;

  document
    .querySelector(".js-reset-confirm-yes")
    .addEventListener("click", () => {
      resetScore();
      hideResetConfirmation();
    });

  document
    .querySelector(".js-reset-confirm-no")
    .addEventListener("click", () => {
      hideResetConfirmation();
    });
}

function hideResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

let intervalId;
let isAutoPlaying = false;

function autoPlay() {
  document.querySelector(".js-auto-play-button").innerHTML = "Stop Play";

  if (!isAutoPlaying) {
    isAutoPlaying = true;
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-auto-play-button").innerHTML = "Auto Play";
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result;
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  if (result === "You win.") {
    score.wins++;
  } else if (result === "You lose.") {
    score.losses++;
  } else if (result === "Tie.") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `You
            <img class="move-icon" src="./icons/${playerMove}-emoji.png" />
            <img class="move-icon" src="./icons/${computerMove}-emoji.png" />
            Computer
          `;

  updateScoreElement();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove;
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
