// Snow generator + simple music controls
const spawnInterval = 150; // ms between spawns
const maxSize = 28; // max font-size px
const minSize = 8;

function createFlake(){
  const flake = document.createElement('div');
  flake.className = 'snowflake';
  flake.textContent = '❄';
  const size = Math.random() * (maxSize - minSize) + minSize;
  flake.style.fontSize = size + 'px';
  flake.style.left = (Math.random() * 100) + 'vw';
  flake.style.opacity = (Math.random() * 0.6 + 0.2).toString();
  const duration = Math.random() * 8 + 6; // seconds
  flake.style.animation = `fall ${duration}s linear forwards`;
  const sway = (Math.random()*40 - 20); // horizontal drift in px applied via transform
  flake.style.transform = `translateX(${sway}px)`;
  document.body.appendChild(flake);
  // remove after animation
  setTimeout(()=>{flake.remove()}, (duration + 0.5) * 1000);
}

// initial burst
for(let i=0;i<20;i++){ setTimeout(createFlake, i*80) }
// continuous spawn
setInterval(createFlake, spawnInterval);

// Music controls
const bg = document.getElementById('bg-music');
const btn = document.getElementById('play-btn');

async function tryAutoPlay(){
  try{
    await bg.play();
    btn.textContent = 'Pause';
  }catch(e){
    // autoplay blocked; leave button showing 'Play'
    btn.textContent = 'Play';
  }
}

btn.addEventListener('click', async ()=>{
  if(bg.paused){
    try{ await bg.play(); btn.textContent='Pause' }catch(e){ btn.textContent='Play' }
  }else{
    bg.pause(); btn.textContent='Play'
  }
});

tryAutoPlay();
