const canvas = document.querySelector('#canvas');
canvas.width = 800;
canvas.height = 800;
canvas.style.cursor = "crosshair";

const ctx = canvas.getContext('2d');

let heroImg = new Image;
heroImg.src = './images/hero/hero_weapon_right.png'

let enemyImg = new Image();
enemyImg.src = './images/enemies/enemy_1_left.png'

let map = new Image();
map.src = './images/maps/map_lvl1.png'

let greenBulletImg = new Image();
greenBulletImg.src = './images/projectiles/blue_bullet.png'

let healthBar = new Image();



const celPixels = 32;
let direction = 'up';
let collisionArray = createCollisionArray(mapArray);
let totalProjectiles = [];
let totalEnemies = [];
let mousePos;
let mousePosPlayer;

let hero = new Hero(heroImg,  //the spritesheet image
                    0,            //x position of hero
                    96,            //y position of hero
                    heroImg.width,         //total width of spritesheet image in pixels
                    heroImg.height,          //total height of spritesheet image in pixels
                    60,           //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                    1,
                    11);
                    
//update function to update all the GameObjects
function update(object) {
    object.update();
}


function keyPressed(e){
    hero.move(e); 
}


// function stopHero(){
//     hero.spritesheet.src= './images/cyborg/Cyborg_idle_384_96.png'
//     hero.numberOfFrames = 4;
//     hero.width = 384;
// }

function getMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

function mousePosition(e){
    mousePos = getMousePos(canvas, e);
    mousePosPlayer = mousePos;
    mousePosPlayer.x = mousePos.x - hero.x;
    mousePosPlayer.y = mousePos.y - hero.y;
    hero.aim(e);
    //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
}

function initialLoad(){
    spawnEnemies(10);
    loop()
}

//The Game Loop
function loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map,0,0,map.width,map.height);
    
    hero.draw();
    for(let projectile of totalProjectiles){
        projectile.draw()
    }
    for(let enemy of totalEnemies){
        enemy.draw()
        enemy.move()

    }    
    requestAnimationFrame(loop);
}

window.addEventListener("keydown", keyPressed)
window.addEventListener("mousemove", mousePosition)
window.addEventListener("click", mouseClick)
window.addEventListener('load', initialLoad)
// window.addEventListener("keyup", stopHero)


