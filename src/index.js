const canvas = document.querySelector('#canvas');
canvas.width = 800;
canvas.height = 800;
canvas.style.cursor = "crosshair";

const ctx = canvas.getContext('2d');

// let heroImg = new Image();
// heroImg.src = './images/hero/hero_weapon_right.png'

let heroSprite= new Image();
heroSprite.src = './images/hero/hero_run_right.png';

const heroStopRightImg = './images/hero/hero_stop_right.png'
const heroDeathImg = './images/hero/hero_death.png'

let map = new Image();
map.src = './images/maps/map_lvl1.png'

let blueBulletImg = new Image();
blueBulletImg.src = './images/projectiles/blue_bullet.png'

let greenBulletImg = new Image();
greenBulletImg.src = './images/projectiles/green_bullet.png'


let healthBar = new Image();

const meleeImgDeath ='./images/enemies/melee_death.png'
const meleeImgStop = './images/enemies/melee_enemy_stop_right.png';
const meleeImgLeft = './images/enemies/melee_enemy_run_left.png';
const meleeImgRight = './images/enemies/melee_enemy_run_right.png';
const rangeImgDeath ='./images/enemies/range_death.png'
const rangeImgStop = './images/enemies/range_enemy_stop_right.png';
const rangeImgLeft = './images/enemies/range_enemy_run_left.png';
const rangeImgRight = './images/enemies/range_enemy_run_right.png';

const celPixels = 32;
let direction = 'up';
let collisionArray = createCollisionArray(mapArray);
let totalProjectiles = [];
let totalEnemies = [];
let totalItems = [];
let mousePos;
let mousePosPlayer;
let movement = false;
let gameOver = false;

const backgroundMusic = new sound("./music/background_music.mp3");   

let hero = new Hero(heroStopRightImg,  //the spritesheet image
                    0,            //x position of hero
                    96,            //y position of hero
                    heroSprite.width,         //total width of spritesheet image in pixels
                    heroSprite.height,          //total height of spritesheet image in pixels
                    150,           //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                    4,
                    11);


//update function to update all the GameObjects
function update(object) {
    object.update();
}


function keyPressed(e){
    hero.move(e); 
}

function keyRelease(e){
    movement = false;
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
    hero.aim(e);
    //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
}

function initialLoad(){    
    backgroundMusic.play();
    spawnEnemies(10,10);
    loop()
}

//The Game Loop
function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(map,0,0,map.width,map.height);
    hero.update();
    hero.draw();
    drawDecoration();
    
    for(let projectile of totalProjectiles){
        projectile.draw(hero)
    }
    
    for(let enemy of totalEnemies){
        enemy.update();
        enemy.draw()
        if(enemy.hasOwnProperty('projectiles')){
            enemy.move('range')
            for(let projectile of enemy.projectiles){
                projectile.draw(enemy);
            }
        }else{
            enemy.move('melee')
        }
    }
    for (let item of totalItems){
        item.draw();
    }

    if(totalEnemies.length === 0){
        map.src = './images/maps/map_lvl1_open.png'
    }
    
    if(!gameOver) requestAnimationFrame(loop);
}

window.addEventListener('keydown', keyPressed)
window.addEventListener('mousemove', mousePosition)
window.addEventListener('click', mouseClick)
window.addEventListener('load', initialLoad)
window.addEventListener('keyup', keyRelease)


