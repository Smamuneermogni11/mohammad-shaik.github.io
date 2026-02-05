// Typing effect
const heroText = "Robotics, Coding & GIS Portfolio";
let i = 0;
function typeWriter() {
  if (i < heroText.length) {
    document.querySelector(".typing").innerHTML += heroText.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}
window.addEventListener("load", typeWriter);

// Particle background
const canvas = document.getElementById("particleCanvas");
if(canvas){
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = 500;

  const particles = [];
  for (let p = 0; p < 100; p++) {
    particles.push({x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*3+1, dx: (Math.random()-0.5)*1, dy: (Math.random()-0.5)*1});
  }

  function animateParticles(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle="rgba(0,191,255,0.7)";
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if(p.x>canvas.width||p.x<0)p.dx*=-1;
      if(p.y>canvas.height||p.y<0)p.dy*=-1;
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

// Skill bubble click
document.querySelectorAll('.bubble').forEach(b => {
  b.addEventListener('click', () => alert(`Explore my projects in ${b.dataset.skill}!`));
});
