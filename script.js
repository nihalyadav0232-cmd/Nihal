const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const scoreText = document.getElementById("score");

let playerX = 125;
let enemyY = -100;
let enemyX = Math.floor(Math.random() * 250);
let score = 0;
let gameOver = false;

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft" && playerX > 0) {
        playerX -= 15;
    }

    if (event.key === "ArrowRight" && playerX < 250) {
        playerX += 15;
    }

    player.style.left = playerX + "px";
});

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
