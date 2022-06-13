let idInterval;

class Enemy{
    constructor(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames,healthPoints, attackPoints){
        this.image = new Image();
        this.image.src = imageSrc
        this.healthImg = new Image();          
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.timePerFrame = timePerFrame; 
        this.healthPoints = healthPoints;
        this.numberOfFrames = numberOfFrames;
        this.attackPoints = attackPoints;
        this.attackAllowed = false;
        this.path;
        //current frame index pointer
        this.frameIndex = 0;
        //time the frame index was last updated
        this.lastUpdate = Date.now();

    }

    //to update
    update = function() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }

    checkZone(){
        if ((this.x >= 288 && this.y <=128 && hero.x >= 288 && hero.y <=128 ) ||
            (this.x < 288 && this.y >= 320 && this.y < 480 && hero.x < 288 && hero.y >= 320 && hero.y < 480 ) ||
            (this.x < 288 && this.y >= 480 && this.y < 640 && hero.x < 288 && hero.y >= 480 && hero.y < 640 ) ||
            (this.x < 288 && this.y >= 640 && this.y < 800 && hero.x < 288 && hero.y >= 640 && hero.y < 800 ) ||
            (this.x >= 384 && this.y >= 320 && hero.x >= 384 && hero.y >= 320) ||
            (this.y >= 192 && this.y < 320 && hero.y >= 192 && hero.y < 320) ||
            (this.y >= 288 && this.x >= 288 && this.x < 384 && hero.y >= 192 && hero.x >= 288 && hero.x < 384)){
                this.attackAllowed = true;
            }
    }

    move(){
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
            if(this.attackAllowed){
                collisionArray[this.row][this.column] = 0
                if (this.x > this.pathToHeroX){
                    this.image.src = meleeImgLeft;
                    this.x -= 1;
                }
                else if(this.x < this.pathToHeroX){
                    this.image.src = meleeImgRight;
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
            }
            this.attack()
        }else{
            collisionArray[this.row][this.column] = 0
            totalEnemies.splice(totalEnemies.indexOf(this),1)
        }
    }

  
    draw(){
        if (this.isAlive()){
            this.calculateRowColumn();
            this.draw_sprite();
            //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            this.healthImg.src = `/images/ui/health_bar_${this.healthPoints}.png`
            ctx.drawImage(this.healthImg , this.x, this.y + this.height, this.healthImg.width, this.healthImg.height)
            collisionArray[this.row][this.column] = 9
        }
    }
    

    draw_sprite() {
        ctx.drawImage(this.image, // Sprite Image
                          this.frameIndex*this.width/this.numberOfFrames, //sx Sprites x coordinate where the frame starts
                          0,    //sy Sprites y coordinate where to frame starts
                          this.width/this.numberOfFrames, //sWidth frame width
                          this.height,  //sHeight frame height
                          this.x,   //dx Canvas x coordinate where the image is positioned
                          this.y,   //dy Canvas y coordinate where the image is positioned
                          this.width/this.numberOfFrames,   //dWidth Image width to be drawn
                          this.height);    //dHeight Image height to be drawn
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
    }

    receiveDamage(damage){
        this.healthPoints -= damage;
    }
    
    isAlive(){
        return this.healthPoints > 0;
    }

    calculateRowColumn(){
        this.row= Math.round(this.y / celPixels);
        this.column = Math.round(this.x /celPixels);
    }
}

class MeleeRobot extends Enemy{
    constructor(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames,healthPoints, attackPoints){
        super(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames,healthPoints, attackPoints)

    }

}
class RangeRobot extends Enemy{
    constructor(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames,healthPoints, attackPoints){
        super(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames,healthPoints, attackPoints)
        this.projectiles = [];
        this.frameCount = 0;

    }
    move(){
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
            if(this.attackAllowed){
                collisionArray[this.row][this.column] = 0
                if (this.x > this.pathToHeroX){
                    this.image.src = rangeImgLeft;
                    this.x -= 1;
                }
                else if(this.x < this.pathToHeroX){
                    this.image.src = rangeImgRight;
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
                if (this.frameCount%100 === 0){
                    this.aim()
                }
                this.frameCount++;
            }
        }else{
            collisionArray[this.row][this.column] = 0
            totalEnemies.splice(totalEnemies.indexOf(this),1)
        }
    }

    attack(){
        this.calculateRowColumn();
        hero.calculateRowColumn()
        if ((hero.row === this.row+15 && hero.column === this.column)  || 
            (hero.column === this.column+1 && hero.row === this.row) ||
            (hero.column === this.column-1 && hero.row === this.row) ||
            (hero.row === this.row-1  && hero.column === this.column)){

            hero.receiveDamage(this.attackPoints, this);
        }
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
            new Projectile(blueBulletImg,
                this.x,
                this.y,
                blueBulletImg.width,
                blueBulletImg.height,
                quadrant,
                ratioXY,
                ratioYX,
                16,
                1)
        )

    }
    receiveDamage(damage){
        this.healthPoints -= damage*2;
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
            new MeleeRobot(meleeImgStop,column*celPixels, row*celPixels, 128, celPixels,150,4,6,1)
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
            new RangeRobot(rageImgStop,column*celPixels, row*celPixels, 128, celPixels,150,4,6,1)
        )
    }
}

