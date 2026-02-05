const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let robot = { x:50, y:250, w:40, h:40, dy:0, jumping:false };
let obstacles = [];
let score = 0;
let gameSpeed = 4;

// Create random obstacles
function createObstacle() {
  const height = 40;
  const width = 20;
  const x = canvas.width;
  obstacles.push({x, y: 300 - height, w: width, h: height});
}
setInterval(createObstacle, 2000);

// Game loop
function gameLoop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Draw robot
  ctx.fillStyle="red";
  ctx.fillRect(robot.x, robot.y, robot.w, robot.h);

  // Gravity
  if(robot.jumping) robot.dy -= 0.5; 
  else robot.dy += 0.5;
  robot.y -= robot.dy;
  if(robot.y > 250) { robot.y=250; robot.jumping=false; robot.dy=0; }

  // Draw and move obstacles
  ctx.fillStyle="black";
  for(let i=0;i<obstacles.length;i++){
    let obs = obstacles[i];
    obs.x -= gameSpeed;
    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

    // Collision
    if(robot.x < obs.x + obs.w && robot.x + robot.w > obs.x &&
       robot.y < obs.y + obs.h && robot.y + robot.h > obs.y){
      alert("Game Over! Score: " + score);
      obstacles = [];
      score = 0;
      return;
    }

    // Score
    if(obs.x + obs.w < robot.x) score++;
  }

  // Draw score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: "+score, 650, 30);

  requestAnimationFrame(gameLoop);
}
gameLoop();

// Jump with SPACE
window.addEventListener("keydown", e => {
  if(e.code=="Space" && !robot.jumping){
    robot.jumping = true;
    robot.dy = 10;
  }
});
