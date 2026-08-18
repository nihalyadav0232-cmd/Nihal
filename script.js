const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreText = document.getElementById("score");

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

let playerX = 125;
let enemyY = -100;
let enemyX = Math.floor(Math.random() * 250);
let score = 0;
let gameOver = false;

// Player position
player.style.left = playerX + "px";

// LEFT button
leftBtn.addEventListener("click", function () {
    if (playerX > 0) {
        playerX -= 20;
        player.style.left = playerX + "px";
    }
});

// RIGHT button
rightBtn.addEventListener("click", function () {
    if (playerX < 250) {
        playerX += 20;
        player.style.left = playerX + "px";
    }
});

// Keyboard control
document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 20;
    }

    if (event.key === "ArrowRight" && playerX < 250) {
        playerX += 20;
    }

    player.style.left = playerX + "px";
});

// Enemy movement
function gameLoop() {

    if (gameOver) return;

    enemyY += 5;

    enemy.style.top = enemyY + "px";
    enemy.style.left = enemyX + "px";

    // Collision
    if (
        enemyY > 400 &&
        enemyY < 480 &&
        enemyX < playerX + 50 &&
        enemyX + 50 > playerX
    ) {
        gameOver = true;
        alert("Game Over! Score: " + score);
        location.reload();
        return;
    }

    // Enemy passed
    if (enemyY > 500) {
        enemyY = -100;
        enemyX = Math.floor(Math.random() * 250);

        score++;
        scoreText.innerText = score;
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
.roadLine {
    position: absolute;
    width: 6px;
    height: 70px;
    background: white;
    left: 147px;
}

.line1 {
    top: 0;
}

.line2 {
    top: 200px;
}

.line3 {
    top: 400px;
}
