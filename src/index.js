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

const celPixels = 32;
let direction = 'up';
let shooting = false;
let collisionArray = createCollisionArray(mapArray);
let totalProjectiles = [];
let mousePos;
let mousePosPlayer;
let angle;

//creem enemic a la fila 6 i columna 22
let enemy = new Enemy(enemyImg, 22*32, 6*32, enemyImg.width, enemyImg.height, 100, 1);

let hero = new Hero(heroImg,  //the spritesheet image
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

function controlHero(e){
    console.log (e.key)

    if( e.key === 'w'){
        direction = 'up';
        if(hero.movementAllowed(direction)) hero.y -= 32;
        heroImg.src = './images/hero/hero_weapon_up.png'
    }else if( e.key === 's' ){
        direction = 'down';
        if(hero.movementAllowed(direction)) hero.y += 32;
        heroImg.src = './images/hero/hero_weapon_down.png'
    }else if( e.key === 'a' ){
        direction = 'left';
        if(hero.movementAllowed(direction)) hero.x -= 32;
        heroImg.src = './images/hero/hero_weapon_left.png'
    }else if( e.key === 'd' ){
        direction = 'right';
        if(hero.movementAllowed(direction)) hero.x += 32;    
        heroImg.src = './images/hero/hero_weapon_right.png'
    }else if (e.key === ' '){
        let offsetX = 0;
        let offsetY = 0;
        switch(direction){
            case 'up':
                offsetX = 20;
                offsetY = -16;
                break;
            case 'down':
                offsetX = 24;
                offsetY = 16;
                break;
            case 'left':
                offsetX = -22;
                offsetY = 12;
                break;
            case 'right':
                offsetX = 32;
                offsetY = 16;
                break;
        }
        totalProjectiles.push(
            new Projectile(greenBulletImg,
                hero.x + offsetX,
                hero.y + offsetY,
                greenBulletImg.width,
                greenBulletImg.height,
                direction,
                16,
                20)
        )
       }
}

// function stopHero(){
//     hero.spritesheet.src= './images/cyborg/Cyborg_idle_384_96.png'
//     hero.numberOfFrames = 4;
//     hero.width = 384;
// }

function initialLoad(){
    console.log('iniciat')
}

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
    let posRatioXY;
    //Gets the click pos realive to player
    pos.x = Math.abs(pos.x - hero.x);
    pos.y = Math.abs(hero.y - pos.y);
    ratioXY = pos.x/pos.y;
    //Gets the angle
    angle = Math.atan2(pos.y, pos.x)*180/Math.PI
    //console.log(angle)
    
    if( mousePosPlayer.x < 0 && mousePosPlayer.y < 0 ){
        let quadrant = 2;
    }else if( mousePosPlayer.x < 0 && mousePosPlayer.y > 0 ){
        let quadrant = 3;
    }else if( mousePosPlayer.x > 0 && mousePosPlayer.y > 0 ){
        let quadrant = 4;
    }

    //console.log(pos.x, pos.y)
    console.log(angle)
    totalProjectiles.push(
        new Projectile(greenBulletImg,
            hero.x,
            hero.y,
            greenBulletImg.width,
            greenBulletImg.height,
            quadrant,
            ratioXY,
            16,
            20)
    )
    console.log('click')
}

//The Game Loop
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map,0,0,map.width,map.height);
    
    //DESCOMENTAR QUAN ENEMICS!!!!!!!!
    // robot.drawEnemy();
    // robot.move(hero.x, hero.y)
    // robot.attack(hero);
    draw(hero);
    draw(enemy);
    requestAnimationFrame(loop);
    for(let projectile of totalProjectiles){
        draw(projectile)
        //projectile.drawImageRot(ctx, projectile.Image, projectile.x, projectile.y, projectile.width, projectile.height, angle)
    }
    
}

window.addEventListener('load', initialLoad)
window.addEventListener("keydown", controlHero)
window.addEventListener("mousemove", mousePosition)
window.addEventListener("click", mouseClick)
// window.addEventListener("keyup", stopHero)


loop();

