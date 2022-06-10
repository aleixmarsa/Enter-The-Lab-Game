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

healthBar.he

const celPixels = 32;
let direction = 'up';
let collisionArray = createCollisionArray(mapArray);
let totalProjectiles = [];
let mousePos;
let mousePosPlayer;

//creem enemic a la fila 6 i columna 22
let enemy = new Enemy(enemyImg, healthBar, 22*32, 6*32, enemyImg.width, enemyImg.height, 6, 1);

let hero = new Hero(heroImg,  //the spritesheet image
                    healthBar,
                    0,            //x position of hero
                    96,            //y position of hero
                    heroImg.width,         //total width of spritesheet image in pixels
                    heroImg.height,          //total height of spritesheet image in pixels
                    60,           //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                    1,
                    100);
//update function to update all the GameObjects
function update(object) {
    object.update();
}

//draw method for drawing everything on canvas
function draw(object) {
    object.draw();
}

function keyPressed(e){
    hero.move(e); 
}



// function stopHero(){
//     hero.spritesheet.src= './images/cyborg/Cyborg_idle_384_96.png'
//     hero.numberOfFrames = 4;
//     hero.width = 384;
// }

function createCollisionArray(mapCollisionArray){
    let collisionArrayRows = [];
    let rowSize = map.width/celPixels;
    for(let i = 0; i < (rowSize); i++){
        collisionArrayRows.push(mapCollisionArray.slice(i*rowSize, (i+1)*rowSize));

    }
    return collisionArrayRows;
}

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
    //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
}

function mouseClick(e){
    //Gets the click pos relative to canvas
    let pos = getMousePos(canvas, e)
    let quadrant = 1;
    //Gets the click pos realive to player
    pos.x = pos.x - hero.x;
    pos.y = pos.y - hero.y;
    const ratioXY = Math.abs(pos.x/pos.y);
    const ratioYX = Math.abs(pos.y/pos.x);
    console.log(pos.x, pos.y)
    
    if( pos.x < 0 && pos.y < 0 ){
        quadrant = 2;
    }else if( pos.x < 0 && pos.y > 0 ){
        quadrant = 3;
    }else if( pos.x > 0 && pos.y > 0 ){
        quadrant = 4;
    }

    totalProjectiles.push(
        new Projectile(greenBulletImg,
            hero.x,
            hero.y,
            greenBulletImg.width,
            greenBulletImg.height,
            quadrant,
            ratioXY,
            ratioYX,
            16,
            1)
    )
}

//The Game Loop

function initialLoad(){
    loop()
}

function loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map,0,0,map.width,map.height);
    
    //DESCOMENTAR QUAN ENEMICS!!!!!!!!
    // robot.drawEnemy();
    // robot.move(hero.x, hero.y)
    // robot.attack(hero);
    draw(hero);
    draw(enemy);
    for(let projectile of totalProjectiles){
        draw(projectile)
    }
    requestAnimationFrame(loop);
}

window.addEventListener("keydown", keyPressed)
window.addEventListener("mousemove", mousePosition)
window.addEventListener("click", mouseClick)
window.addEventListener('load', initialLoad)
// window.addEventListener("keyup", stopHero)


