const girl = document.getElementById("girl");
const cake = document.getElementById("cake");
const message = document.getElementById("message");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const birthdayCard = document.getElementById("birthdayCard");

let isJumping = false;
let cakePosition = -70;
let gameRunning = false;
let timeLeft = 10;
let timer;


// ==============================
// JUMP
// ==============================

function jump() {

    if (!gameRunning || isJumping) {
        return;
    }

    isJumping = true;

    girl.style.bottom = "150px";

    setTimeout(() => {

        girl.style.bottom = "38px";
        isJumping = false;

    }, 500);
}


// ==============================
// KEYBOARD
// ==============================

document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        event.preventDefault();
        jump();

    }

});


// ==============================
// MOBILE / MOUSE
// ==============================

document.getElementById("gameArea").addEventListener("click", () => {

    jump();

});


// ==============================
// CAKE MOVEMENT
// ==============================

function moveCake() {

    if (!gameRunning) {
        return;
    }

    cakePosition += 5;

    cake.style.right = cakePosition + "px";

    if (cakePosition > 850) {
        cakePosition = -70;
    }

    requestAnimationFrame(moveCake);
}


// ==============================
// COLLISION
// ==============================

function checkCollision() {

    if (!gameRunning) {
        return;
    }

    const girlRect = girl.getBoundingClientRect();
    const cakeRect = cake.getBoundingClientRect();

    const collision =
        girlRect.left < cakeRect.right &&
        girlRect.right > cakeRect.left &&
        girlRect.top < cakeRect.bottom &&
        girlRect.bottom > cakeRect.top;

    if (collision) {

        gameOver();
        return;

    }

    requestAnimationFrame(checkCollision);
}


// ==============================
// GAME OVER
// ==============================

function gameOver() {

    gameRunning = false;

    clearInterval(timer);

    cake.style.display = "none";

    birthdayCard.style.display = "none";

    message.textContent = "💥 GAME OVER!";
    message.style.color = "#d62828";

    startButton.style.display = "block";
    startButton.textContent = "TRY AGAIN";
}


// ==============================
// GAME COMPLETE
// ==============================

function gameComplete() {

    gameRunning = false;

    clearInterval(timer);

    cake.style.display = "none";

    message.textContent = "";

    birthdayCard.style.display = "block";

    startButton.style.display = "block";
    startButton.textContent = "PLAY AGAIN";
}


// ==============================
// TIMER
// ==============================

function startTimer() {

    timer = setInterval(() => {

        if (!gameRunning) {

            clearInterval(timer);
            return;

        }

        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {

            gameComplete();

        }

    }, 1000);
}


// ==============================
// START GAME
// ==============================

function startGame() {

    clearInterval(timer);

    gameRunning = true;

    timeLeft = 10;

    timerDisplay.textContent = timeLeft;

    cakePosition = -70;

    cake.style.right = "-70px";
    cake.style.display = "block";

    message.textContent = "";

    birthdayCard.style.display = "none";

    startButton.style.display = "none";

    moveCake();

    checkCollision();

    startTimer();
}


// ==============================
// START BUTTON
// ==============================

startButton.addEventListener("click", (event) => {

    event.stopPropagation();

    startGame();

});