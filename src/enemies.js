
class Enemy{
    constructor(imageSrc,x ,y , width, height, healthPoints, attackPoints){
        this.image = new Image();
        this.image.src = imageSrc
        this.healthImg = new Image();          
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.healthPoints = healthPoints;
        this.attackPoints = attackPoints;
        this.attackAllowed = false;
        this.path;
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
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            this.healthImg.src = `/images/ui/health_bar_${this.healthPoints}.png`
            ctx.drawImage(this.healthImg , this.x, this.y + this.height, this.healthImg.width, this.healthImg.height)
            collisionArray[this.row][this.column] = 9
        }
    }
    

    attack(){

        this.calculateRowColumn();
        hero.calculateRowColumn()
       
        if ((hero.row === this.row+1 && hero.column === this.column)  || 
            (hero.column === this.column+1 && hero.row === this.row) ||
            (hero.column === this.column-1 && hero.row === this.row) ||
            (hero.row === this.row-1  && hero.column === this.column)){
            console.log('hero hitted')
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
    constructor(imageSrc,x ,y , width, height, healthPoints, attackPoints){
        super(imageSrc,x ,y , width, height, healthPoints, attackPoints)

    }

}
class RangeRobot extends Enemy{
    constructor(imageSrc,x ,y , width, height, healthPoints, attackPoints){
        super(imageSrc,x ,y , width, height, healthPoints, attackPoints)

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
            }
            this.attack()
        }else{
            collisionArray[this.row][this.column] = 0
            totalEnemies.splice(totalEnemies.indexOf(this),1)
        }
    }
}

function spawnEnemies(numEnemies){

    for(let i = 0; i < numEnemies; i++){
        let created = false;
        let column;
        let row;
        while(!created){
            column = Math.floor(Math.random()*collisionArray[0].length)
            row = Math.floor(Math.random()*collisionArray.length)
            if(collisionArray[row][column] === 0 && collisionArray[row+1][column] === 0) created = true;
        }
        totalEnemies.push(
            new MeleeRobot(meleeImgLeft,column*celPixels, row*celPixels, celPixels, celPixels, 6, 1)
        )
    }

    for(let i = 0; i < numEnemies; i++){
        let created = false;
        let column;
        let row;
        while(!created){
            column = Math.floor(Math.random()*collisionArray[0].length)
            row = Math.floor(Math.random()*collisionArray.length)
            if(collisionArray[row][column] === 0 && collisionArray[row+1][column] === 0) created = true;
        }
        totalEnemies.push(
            new RangeRobot(rangeImgLeft,column*celPixels, row*celPixels, celPixels, celPixels, 6, 1)
        )
    }
}

