const canvas = document.querySelector('#canvas');
canvas.width = 1900;
canvas.height = 800;
canvas.style.border = '1px solid #000000'
canvas.style.backgroundColor = 'grey';
const ctx = canvas.getContext('2d');

let heroSprite = new Image;
heroSprite.src = './images/cyborg/Cyborg_idle_384_96.png'

let robotImg = new Image();
robotImg.src = './images/enemies/robot_66_79.png'

let robot = new Enemy(robotImg,100,100,66,79,100,1);
let hero = new Hero(heroSprite,  //the spritesheet image
                        canvas.width/2,            //x position of hero
                        canvas.height/2,            //y position of hero
                        384,         //total width of spritesheet image in pixels
                        96,          //total height of spritesheet image in pixels
                        60,           //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                        4,
                        100);


//update function to update all the GameObjects
function update(object) {
    object.update();
}

//draw method for drawing everything on canvas
function draw(object) {
    object.draw();
}

function moveHero(e){
    console.log (e.key)
    if( e.key === 'w' ){
        hero.y -= 20;
    }else if( e.key === 's' ){
        hero.y += 20;
    }else if( e.key === 'a' ){
        hero.x -= 20;
    }else if( e.key === 'd' ){
        hero.spritesheet.src= './images/cyborg/Cyborg_run_576_96.png';
        hero.numberOfFrames = 6;
        hero.width = 576;
        hero.x += 20;
    }
}

function stopHero(){
    hero.spritesheet.src= './images/cyborg/Cyborg_idle_384_96.png'
    hero.numberOfFrames = 4;
    hero.width = 384;
}



//The Game Loop
function loop() {
    robot.drawEnemy();
    robot.move(hero.x, hero.y)
    robot.attack(hero);
    update(hero);
    draw(hero);
    requestAnimationFrame(loop);
}


window.addEventListener("keydown", moveHero)
window.addEventListener("keyup", stopHero)
robot.drawEnemy();
console.log(robot)
loop();

