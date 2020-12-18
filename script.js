var canvas = document.getElementById ("myCanvas");
var ctx= canvas.getContext ("2d");
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


var x= canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy =-2;
var ballRadius = 10;
var paddleWidth = 75;
var paddleHeight = 10;
var paddleX = (canvas.width-paddleWidth)/2; 


// Draw the ball
function drawBall (){
    
    ctx.beginPath();
    ctx.arc (x, y, ballRadius , 0, Math.PI*2, false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}
// Draw the paddle
function drawPaddle (){
    ctx.beginPath();
    ctx.rect (paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
// make the ball moving and change direction when it hit the wall
function draw (){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    x += dx;
    y += dy;
    if (x + dx < ballRadius ||x + dx > canvas.width - ballRadius) {
        dx = -dx;
    }
    if ( y + dy < ballRadius || y + dy > canvas.height - ballRadius){
        dy = -dy;
    }
}
setInterval(draw,10);
