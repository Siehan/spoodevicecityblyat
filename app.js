const character = document.querySelector(".character");
const spooder = document.querySelector(".spooder");

const keyState = {};
const player = {
  x: 0,
  y: 0,
  isAirbourne: false,
  direction: 180
};

const spooderObj = {
    x: 1300,
}

window.onkeydown = function(e) {
  keyState[e.code] = true;
};
window.onkeyup = function(e) {
  keyState[e.code] = false;
};

const draw = () => {
  if (keyState["Space"]) jump(player);
  if (keyState["KeyD"]) movePlayer("right");
  if (keyState["KeyA"]) movePlayer("left");
  moveSpooder(spooderObj);
  updateSpooder(spooder,spooderObj)
  updateCharacter(character,player);
  requestAnimationFrame(draw);

};
requestAnimationFrame(draw);

function updateCharacter(character,player) {
  character.style.transform = `rotateY(${player.direction}deg) translate(${
    player.direction === 0 ? player.x : -player.x
  }px,${-player.y}px)`;
}

function moveSpooder(spooder){
    spooder.x -= 10;
    if(spooder.x < -200){
        spooder.x = 1200
    }
}

function updateSpooder(spooder,obj){
    spooder.style.transform = `translateX(${obj.x}px)`
}

function movePlayer(direction) {
  if (direction === "right") {
    player.x += 10;
    player.direction = 180;
    return;
  } else {
    player.x -= 10;
    player.direction = 0;
  }
}

function fall(player) {
  let intervalId = setInterval(() => {
    if (player.y === 0) {
      player.isAirbourne = false;
      clearInterval(intervalId);
      return;
    }
    player.y -= 20;
  }, 10);
}

function jump(player) {
  let limit = 0;
  if (!player.isAirbourne) {
    player.isAirbourne = true;
    let intervalId = setInterval(() => {
      if (limit > 30) {
        fall(player);
        clearInterval(intervalId);
      }
      player.y += 40;
      limit++;
    }, 10);
  }
}
