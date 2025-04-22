let mysteryNumber;
let attemptsLeft;
const maxAttempts = 3;
let difficultyMultiplier;
let currentDifficulty = "easy";
let timerInterval;
let timeLeft = 30;

const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

function startGame() {
    const difficulty = document.getElementById("difficulty").value;
    setDifficulty(difficulty);

    mysteryNumber = generateMysteryNumber();
    attemptsLeft = maxAttempts;
    timeLeft = 30;

    document.getElementById("guess").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = `Essais restants : ${attemptsLeft}`;
    document.getElementById("timeLeft").textContent = timeLeft;
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("submitGuess").disabled = false;

    clearInterval(timerInterval);
    startTimer();
}

function setDifficulty(difficulty) {
    currentDifficulty = difficulty;
    switch (difficulty) {
        case "easy":
            difficultyMultiplier = 10;
            break;
        case "medium":
            difficultyMultiplier = 50;
            break;
        case "hard":
            difficultyMultiplier = 100;
            break;
        default:
            difficultyMultiplier = 10;
    }
}

function generateMysteryNumber() {
    return Math.floor(Math.random() * difficultyMultiplier) + 1;
}

function checkGuess() {
    const userGuess = parseInt(document.getElementById("guess").value);

    if (isNaN(userGuess)) {
        document.getElementById("message").textContent = "❌ Veuillez entrer un nombre valide.";
        return;
    }

    attemptsLeft--;

    if (userGuess === mysteryNumber) {
        document.getElementById("message").textContent = "✅ Bravo ! Vous avez trouvé le bon nombre !";
        winSound.play();
        endGame();
    } else if (attemptsLeft === 0) {
        document.getElementById("message").textContent = `❌ Perdu ! Le nombre était ${mysteryNumber}.`;
        loseSound.play();
        endGame();
    } else {
        const hint = userGuess < mysteryNumber ? "plus grand" : "plus petit";
        document.getElementById("message").textContent = `❌ Faux ! Essayez un nombre ${hint}.`;
        document.getElementById("attempts").textContent = `Essais restants : ${attemptsLeft}`;
    }
}

function endGame() {
    document.getElementById("submitGuess").disabled = true;
    document.getElementById("restartButton").style.display = "inline-block";
    clearInterval(timerInterval);
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timeLeft").textContent = timeLeft;
        if (timeLeft <= 0) {
            document.getElementById("message").textContent = `⏰ Temps écoulé ! Le nombre était ${mysteryNumber}.`;
            loseSound.play();
            endGame();
        }
    }, 1000);
}

document.getElementById("submitGuess").addEventListener("click", checkGuess);
document.getElementById("restartButton").addEventListener("click", startGame);
window.addEventListener("load", startGame);
