const player = document.getElementById("player");
const enemy = document.getElementById("enemy");

const scoreText = document.getElementById("score");
const speedText = document.getElementById("speed");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const lines = document.querySelectorAll(".road-line");

let playerX = 136;
let enemyY = -100;
let enemyX = 80;

let score = 0;
let speed = 5;
let gameOver = false;

const roadWidth = 330;
const carWidth = 58;

// Player movement
function moveLeft() {
    if (playerX > 50) {
        playerX -= 25;
        player.style.left = playerX + "px";
    }
}

function moveRight() {
    if (playerX < roadWidth - carWidth - 50) {
        playerX += 25;
        player.style.left = playerX + "px";
    }
}

leftBtn.addEventListener("click", moveLeft);
rightBtn.addEventListener("click", moveRight);

// Keyboard
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft") {
        moveLeft();
    }

    if (event.key === "ArrowRight") {
        moveRight();
    }
});

// Game loop
function gameLoop() {

    if (gameOver) return;

    // Enemy movement
    enemyY += speed;

    enemy.style.top = enemyY + "px";
    enemy.style.left = enemyX + "px";

    // Moving road
    lines.forEach(line => {

        let top = parseInt(
            window.getComputedStyle(line).top
        );

        top += speed;

        if (top > 580) {
            top = -100;
        }

        line.style.top = top + "px";
    });

    // Collision
    if (
        enemyY + 75 > 450 &&
        enemyY < 550 &&
        enemyX < playerX + carWidth &&
        enemyX + carWidth > playerX
    ) {

        gameOver = true;

        alert(
            "🏁 GAME OVER!\n\nYour Score: " + score
        );

        location.reload();
        return;
    }

    // Enemy passed
    if (enemyY > 580) {

        enemyY = -100;

        // 3 lanes
        const lanes = [60, 136, 212];

        enemyX =
            lanes[Math.floor(Math.random() * lanes.length)];

        score++;

        scoreText.innerText = score;

        // Speed increases
        if (score % 5 === 0) {
            speed += 1;
            speedText.innerText = speed;
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
