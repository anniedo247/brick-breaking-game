var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
// // Drawing a rectangle
// ctx.beginPath();
// ctx.rect(20,40,50,50);
// ctx.fillStyle = "red";
// ctx.fill();
// ctx.closePath();
// // Drawing a circle
// ctx.beginPath();
// ctx.arc(240,160,50,0, Math.PI*2, false);
// ctx.fillStyle = "#0095DD";
// ctx.fill();
// ctx.closePath();
// // Drawing a rect - only color the outer stroke
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "green";
// ctx.stroke();
// ctx.closePath();
// // Clearing background
// ctx.clearRect (0, 0, 480, 320);

var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 1.5;
var dy = -1.5;
var ballRadius = 10;
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var interval = setInterval(draw, 10);
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffSetTop = 30;
var brickOffSetLeft = 30;
var bricks = [];
var score = 0;
var lives = 3;
var highScore = 0;
var gameStatus = 1;

function init() {
  bricks = [];
  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
  score = 0;
  lives = 3;
}
init();

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
  if (e.key == "Enter" && gameStatus == 0) {
    gameStatus = 1;
    init();
    interval = setInterval(draw, 10);
  }
}
function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          if (r === 1 && c === 2) {
            // change ball speed when it hit green brick
            dx = 5;
            dy = -5;
          }
          dy = -dy;
          b.status = 0;
          score = score + brickRowCount - r;
          if (score > highScore) {
            highScore = score;
          }

          if (
            score === ((brickRowCount * (brickRowCount + 1)) / 2) * brickColumnCount
          ) {
            ctx.font = "30px Arial";
            ctx.fillText(
              " !!! YOU WIN !!!",
              canvas.width - 350,
              canvas.height / 2
            );
            clearInterval(interval); // Needed for Chrome to end game
            gameStatus = 0;
          }
        }
      }
    }
  }
}
// Draw the score
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, 8, 20);
}
// Draw the live
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Your Lives: " + lives + "/3", canvas.width - 300, 20);
}
// Draw the highscore
function drawHighScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("High Score: " + highScore, canvas.width - 120, 20);
}

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
// Draw the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight); // paddle will be in the middle of the bottom line.
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
// Draw bricks
function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffSetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffSetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        if (r == 0) {
          ctx.fillStyle = "red";
        }
        if (r == 1) {
          if (c === 2) {
            ctx.fillStyle = "green";
          } else {
            ctx.fillStyle = "orange";
          }
        }
        if (r === 2) {
          ctx.fillStyle = "yellow";
        }

        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// make the ball moving and change direction when it hit the wall
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawPaddle();
  drawBall();
  collisionDetection();
  drawScore();
  drawLives();
  drawHighScore();

  x += dx;
  y += dy;
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (lives === 0) {
        ctx.font = "30px Arial";
        ctx.fillText(" GAME OVER", canvas.width - 350, canvas.height / 2);
        clearInterval(interval);
        gameStatus = 0;
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 1.5;
        dy = -1.5;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed) {
    paddleX += 7;
    if (paddleX > canvas.width - paddleWidth) {
      paddleX = canvas.width - paddleWidth;
    }
  }
  if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}
