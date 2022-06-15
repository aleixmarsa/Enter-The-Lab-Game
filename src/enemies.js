const meleeImgDeath ='./images/enemies/melee_death.png'
const meleeImgStop = './images/enemies/melee_enemy_stop_right.png';
const meleeImgLeft = './images/enemies/melee_enemy_run_left.png';
const meleeImgRight = './images/enemies/melee_enemy_run_right.png';
const rangeImgDeath ='./images/enemies/range_death.png'
const rangeImgStop = './images/enemies/range_enemy_stop_right.png';
const rangeImgLeft = './images/enemies/range_enemy_run_left.png';
const rangeImgRight = './images/enemies/range_enemy_run_right.png';

let greenBulletImg = './images/projectiles/green_bullet.png'
const healthItemImg = './images/items/potion.png';

const enemyDestroyedSound ='./music/melee_destroyed.wav';   



class Enemy extends AliveObject{

    constructor(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames, healthPoints, attackPoints, deathSoundSrc){
        super(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames, healthPoints, attackPoints, deathSoundSrc)
        this.runImgLeft;
        this.runImgRight;    
        this.path;
        this.moving = false;
        this.heroDetected = false;
    }
    
    checkZone(){
        if ((this.x >= 9*celPixels && this.y < 6*celPixels && (hero.x >= 9*celPixels && hero.y < 6*celPixels || hero.x >= 15*celPixels && hero.y < 9*celPixels)) || //IronHack Room
            (this.x < 9*celPixels && this.y >= 10*celPixels && this.y < 15*celPixels && (hero.x < 9*celPixels && hero.y >= 10*celPixels && hero.y < 15*celPixels || hero.x < 12*celPixels && hero.y >= 11*celPixels)) || //First small room
            (this.x < 9*celPixels && this.y >= 15*celPixels && this.y < 20*celPixels && (hero.x < 9*celPixels && hero.y >= 15*celPixels && hero.y < 20*celPixels || hero.x < 12*celPixels && hero.y >= 16*celPixels)) || //Second small room
            (this.x < 9*celPixels && this.y >= 20*celPixels && this.y < 25*celPixels && (hero.x < 9*celPixels && hero.y >= 20*celPixels && hero.y < 25*celPixels || hero.x < 12*celPixels && hero.y >= 21*celPixels)) || //Third small room
            (this.x >= 12*celPixels && this.y >= 10*celPixels && hero.x >= 11*celPixels && hero.y >= 10*celPixels) || //Big room
            (this.y >= 5*celPixels && this.y < 10*celPixels && hero.y >= 5*celPixels && hero.y < 10*celPixels) || // Horizontal corridor
            (this.y >= 9*celPixels && this.x >= 8*celPixels && this.x < 12*celPixels && hero.y >= 6*celPixels && hero.x >= 8*celPixels && hero.x < 12*celPixels)){ // Vertical corridor            
                this.heroDetected = true;
            }
    }

    move(){
        if(hero.isAlive()){
            if(this.isAlive()){
                let nodes = buildNodes();
                this.calculateRowColumn();
                hero.calculateRowColumn();
            
                this.path = Pathfinder.findPath( nodes, nodes[this.row][this.column], nodes[hero.row][hero.column] );
                if(this.path.length >= 1){
                    this.pathToHeroY = this.path[0].px_x;
                    this.pathToHeroX = this.path[0].px_y;
                }
                this.checkZone();
                this.draw()
                if(this.heroDetected){
                    collisionArray[this.row][this.column] = 0
                    if (this.x > this.pathToHeroX){
                        this.image.src = this.runImgLeft;
                        this.x -= 1;
                    }
                    else if(this.x < this.pathToHeroX){
                        this.image.src = this.runImgRight;
                        this.x += 1;
                    }
                    if (this.y > this.pathToHeroY){
                        this.y -= 1;
                    }
                    else if (this.y < this.pathToHeroY){
                        this.y += 1;
                    }
                     this.calculateRowColumn();
                    collisionArray[this.row][this.column] = 9

                    this.attack()
                      
                }
                
            }else{
                collisionArray[this.row][this.column] = 0    
            }
        }
    }

   
    draw() {
        if(!this.isAlive()){
            this.deathSound.play();
            this.deathParameters();
            if(this.deathFrame <= this.numberOfFrames-1){
                this.frameIndex = this.deathFrame;
            }else{
                this.generateItem();
                totalEnemies.splice(totalEnemies.indexOf(this),1)
            }
        }
        ctx.drawImage(this.image, // Sprite Image
                    this.frameIndex*this.width/this.numberOfFrames, //sx Sprites x coordinate where the frame starts
                    0,    //sy Sprites y coordinate where to frame starts
                    this.width/this.numberOfFrames, //sWidth frame width
                    this.height,  //sHeight frame height
                    this.x,   //dx Canvas x coordinate where the image is positioned
                    this.y,   //dy Canvas y coordinate where the image is positioned
                    this.width/this.numberOfFrames,   //dWidth Image width to be drawn
                    this.height);    //dHeight Image height to be drawn
        if(this.healthPoints >= 0){
            this.healthImg.src = `./images/ui/health_bar_${this.healthPoints}.png`
        }
        ctx.drawImage(this.healthImg , this.x, this.y + this.height, this.healthImg.width, this.healthImg.height)
    }
  
    receiveDamage(damage){
        if(this.healthPoints > 0){
            this.healthPoints -= damage;
        }
        if(this.healthPoints < 0){
            this.healthPoints = 0;
        }
    }

    generateItem(){
        let random = Math.random()
                console.log(random)
                if(random > 0.5){
                    totalItems.push(
                        new GameObject(healthItemImg,
                            this.x,
                            this.y,
                            13,
                            13
                        )
                    )
                }
    }
}

class MeleeRobot extends Enemy{
    constructor(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames,healthPoints, attackPoints, deathSoundSrc){
        super(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames,healthPoints, attackPoints,deathSoundSrc)
        this.runImgLeft = meleeImgLeft;
        this.runImgRight = meleeImgRight;
        this.deathImg = meleeImgDeath;

    }

    deathParameters(){
        this.numberOfFrames = 7;
        this.image.src = this.deathImg;
        this.width = 236;
        this.height = 32;
        this.timePerFrame = 100;
    }

    attack(){

        this.calculateRowColumn();
        hero.calculateRowColumn()
       
        if ((hero.row === this.row+1 && hero.column === this.column) || 
            (hero.column === this.column+1 && hero.row === this.row) ||
            (hero.column === this.column-1 && hero.row === this.row) ||
            (hero.row === this.row-1  && hero.column === this.column)){
            hero.receiveDamage(this.attackPoints, this);
            //Simulates robot auto destroy
            this.healthPoints = 0;
        }
    }

}


class RangeRobot extends Enemy{
    constructor(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames,healthPoints, attackPoints, deathSoundSrc){
        super(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames,healthPoints, attackPoints, deathSoundSrc)
        this.runImgLeft = rangeImgLeft;
        this.runImgRight = rangeImgRight;
        this.deathImg = rangeImgDeath;
        this.projectiles = [];
        this.frameCount = 0;
        this.frameCount = 0;
    }

    deathParameters(){
        this.numberOfFrames = 8;
        this.image.src = this.deathImg;
        this.width = 272;
        this.height = 32;
        this.timePerFrame = 100;
    }
    

    attack(){
        this.calculateRowColumn();
        hero.calculateRowColumn()
        if ((hero.row === this.row+1 && hero.column === this.column)  || 
            (hero.column === this.column+1 && hero.row === this.row) ||
            (hero.column === this.column-1 && hero.row === this.row) ||
            (hero.row === this.row-1  && hero.column === this.column)){

            hero.receiveDamage(this.attackPoints, this);
        }
        if (this.frameCount%100 === 0){
            this.aim()
        }
        this.frameCount++;   
    }

    aim(){
            //Gets the click pos relative to canvas
        let pos = {
            x: this.x,
            y: this.y
        }

        let quadrant = 1;
        //Gets the click pos realive to player
        pos.x = hero.x - pos.x;
        pos.y = hero.y - pos.y; 
        if(pos.x === 0){
            pos.x = 1;
        }else if(pos.y === 0){
            pos.y = 1;
        }
        const ratioXY = Math.abs(pos.x/pos.y);
        const ratioYX = Math.abs(pos.y/pos.x);
        if( pos.x < 0 && pos.y < 0 ){
            quadrant = 2;
        }else if( pos.x < 0 && pos.y > 0 ){
            quadrant = 3;
        }else if( pos.x > 0 && pos.y > 0 ){
            quadrant = 4;
        }

        this.projectiles.push(
            new Projectile(greenBulletImg,
                this.x,
                this.y,
                12,
                12,
                quadrant,
                ratioXY,
                ratioYX,
                10,
                this.damage)
        )

    }
    
    receiveDamage(damage){
        this.healthPoints -= damage*2;
        if(this.healthPoints < 0){
            this.healthPoints === 0;
        }
    }
}

function spawnEnemies(meleeEnemies, rangeEnemies){
    for(let i = 0; i < meleeEnemies; i++){
        let created = false;
        let column;
        let row;
        while(!created){
            column = Math.floor(Math.random()*collisionArray[0].length)
            row = Math.floor(Math.random()*collisionArray.length)
            if(collisionArray[row][column] === 0 && collisionArray[row+1][column] === 0) created = true;
        }
        totalEnemies.push(
            new MeleeRobot(meleeImgStop,column*celPixels, row*celPixels, 128, celPixels,150,4,6,7,enemyDestroyedSound)
        )
    }
    for(let i = 0; i < rangeEnemies; i++){
        let created = false;
        let column;
        let row;
        while(!created){
            column = Math.floor(Math.random()*collisionArray[0].length)
            row = Math.floor(Math.random()*collisionArray.length)
            if(collisionArray[row][column] === 0 && collisionArray[row+1][column] === 0) created = true;
        }
        totalEnemies.push(
            new RangeRobot(rangeImgStop,column*celPixels, row*celPixels, 128, celPixels,150,4,6,1,enemyDestroyedSound)
        )
    }
}

function drawEnemies(){
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
    enemiesDOM.innerHTML= totalEnemies.length;
}


function drawItems(){
    for (let item of totalItems){
        item.draw();
    }
}

function removeItems(){
    totalItems = [];

}


function removeEnemies(){
    totalEnemies = [];
}
