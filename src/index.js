const canvas = document.querySelector('#canvas');
canvas.width = 800;
canvas.height = 800;
//canvas.style.border = '1px solid #000000'
//canvas.style.backgroundColor = 'grey';
const ctx = canvas.getContext('2d');

let heroImg = new Image;
heroImg.src = './images/hero/hero_weapon_right.png'

let enemyImg = new Image();
enemyImg.src = './images/enemies/enemy_1_left.png'
let map = new Image();
map.src = './images/maps/map_lvl1.png'

let greenBulletImg = new Image();
greenBulletImg.src = './images/hero/green_bullet.png'

let enemy = new Enemy(enemyImg, 700, 200, enemyImg.width, enemyImg.height, 100, 1);
let hero = new Hero(heroImg,  //the spritesheet image
                    0,            //x position of hero
                    96,            //y position of hero
                    32,         //total width of spritesheet image in pixels
                    32,          //total height of spritesheet image in pixels
                    60,           //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                    1,
                    100);


let collisionArray = [];
const celPixels = 32;
let direction = 'up';
let shooting = false;
let totalProjectiles = [];

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
        // hero.spritesheet.src= './images/cyborg/Cyborg_run_576_96.png';
        // hero.numberOfFrames = 6;
        // hero.width = 576;
        direction = 'right';
        if(hero.movementAllowed(direction)) hero.x += 32;    
        heroImg.src = './images/hero/hero_weapon_right.png'
    }else if (e.key === ' '){
        console.log(direction)
        let offsetX = 0;
        let offsetY = 0;
        switch(direction){
            case 'up':
                greenBulletImg.src = './images/projectiles/green_bullet_vertical.png'
                offsetX = 20;
                offsetY = -16;
                break;
            case 'down':
                greenBulletImg.src = './images/projectiles/green_bullet_vertical.png'
                offsetX = 24;
                offsetY = 16;
                break;
            case 'left':
                greenBulletImg.src = './images/projectiles/green_bullet_horizontal.png'
                offsetX = -22;
                offsetY = 12;
                break;
            case 'right':
                greenBulletImg.src = './images/projectiles/green_bullet_horizontal.png'
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

function checkCollision(hero){}

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
    }
    
}

window.addEventListener('load', initialLoad)
window.addEventListener("keydown", controlHero)
// window.addEventListener("keyup", stopHero)

collisionArray = createCollisionArray(mapArray);
loop();

