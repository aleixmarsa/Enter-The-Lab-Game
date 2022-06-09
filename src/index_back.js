const canvas = document.querySelector('#canvas');
canvas.width = 1900;
canvas.height = 800;
canvas.style.border = '1px solid #000000'
console.log(canvas)
const ctx = canvas.getContext('2d');

let heroSprite = new Image;
heroSprite.src = './images/cyborg/Cyborg_idle_384_96.png'

let robotImg = new Image('./images/enemies/robot_66_79.png');
// robotImg.src = './images/enemies/robot_66_79.png'

let robot = new Enemy(robotImg,100,100,66,79);
let hero = new GameObject(heroSprite,  //the spritesheet image
                        canvas.width/2,            //x position of hero
                        canvas.height/2,            //y position of hero
                        384,         //total width of spritesheet image in pixels
                        96,          //total height of spritesheet image in pixels
                        60,           //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
                        4);

function GameObject(spritesheet, x, y, width, height, timePerFrame, numberOfFrames) {
    this.spritesheet = spritesheet;             
    this.x = x;                                 
    this.y = y;                                 
    this.width = width;                         
    this.height = height;                       
    this.timePerFrame = timePerFrame;            
    this.numberOfFrames = numberOfFrames || 1; 

    //current frame index pointer
    this.frameIndex = 0;

    //time the frame index was last updated
    this.lastUpdate = Date.now();

    //to update
    this.update = function() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }

    //to draw on the canvas, parameter is the ctx of the canvas to be drawn on
    this.draw = function(ctx) {
        ctx.drawImage(this.spritesheet,
                          this.frameIndex*this.width/this.numberOfFrames,
                          0,
                          this.width/this.numberOfFrames,
                          this.height,
                          this.x,
                          this.y,
                          this.width/this.numberOfFrames,
                          this.height);
    }
}


//update function to update all the GameObjects
function update() {
    hero.update();
}

//draw method for drawing everything on canvas
function draw() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    hero.draw(ctx);
}

function moveHero(e){
    console.log (e)
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
    console.log (hero.x)
}

function stopHero(){
    console.log('parat')
    hero.spritesheet.src= './images/cyborg/Cyborg_idle_384_96.png'
    hero.numberOfFrames = 4;
    hero.width = 384;
}



//The Game Loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}


window.addEventListener("keydown", moveHero)
window.addEventListener("keyup", stopHero)

loop();

