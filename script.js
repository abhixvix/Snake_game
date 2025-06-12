const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 30;
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};
let score = 0;

// Load images
const foodImg = new Image();
foodImg.src = "assets/food.png";

const headImg = new Image();
headImg.src = "assets/head.png";

const bodyImg = new Image();
bodyImg.src = "assets/body.png";

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.drawImage(foodImg, food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    const img = i === 0 ? headImg : bodyImg;
    ctx.drawImage(img, snake[i].x, snake[i].y, box, box);
  }

  // Move snake
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;

  // Game over conditions
  if (
    snakeX < 0 || snakeX >= canvas.width ||
    snakeY < 0 || snakeY >= canvas.height ||
    snake.some((segment, index) => index !== 0 && segment.x === snakeX && segment.y === snakeY)
  ) {
    clearInterval(game);
    alert("Game Over! Score: " + score);
    return;
  }

  // Eat food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    snake.pop();
  }

  // Add new head
  const newHead = { x: snakeX, y: snakeY };
  snake.unshift(newHead);

  // Score text
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

let game = setInterval(draw, 120);
