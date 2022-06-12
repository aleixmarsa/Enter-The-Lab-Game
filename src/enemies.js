class Enemy{
    constructor(x ,y , width, height, healthPoints, attackPoints){
        this.image = new Image();
        this.image.src = './images/enemies/enemy_1_left.png';
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
            let rowEnemy = Math.floor(this.y/celPixels);
            let columnEnemy = Math.floor(this.x/celPixels);
            let rowHero = Math.floor(hero.y/celPixels);
            let columnHero = Math.floor(hero.x/celPixels);
        
            this.path = Pathfinder.findPath( nodes, nodes[rowEnemy][columnEnemy], nodes[rowHero][columnHero] );
            if(this.path.length >= 1){
                this.pathToHeroY = this.path[0].px_x;
                this.pathToHeroX = this.path[0].px_y;
            }
            this.checkZone();
            if(this.attackAllowed){
                collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] = 0
                if (this.x > this.pathToHeroX){
                    this.image.src = './images/enemies/enemy_1_left.png';
                    this.x -= 1;
                }
                else if(this.x < this.pathToHeroX){
                    this.image.src = './images/enemies/enemy_1_right.png';
                    this.x += 1;
                }
                if (this.y > this.pathToHeroY){
                    this.y -= 1;
                }
                else if (this.y < this.pathToHeroY){
                    this.y += 1;
                }
                collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] = 9
            }
        }else{
            collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] = 0

        }


    }

  
    draw(){
        if (this.isAlive()){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            let stringHealth = String(this.healthPoints)
            this.healthImg.src = `/images/ui/health_bar_${stringHealth}.png`
            ctx.drawImage(this.healthImg , this.x, this.y + this.height, this.healthImg.width, this.healthImg.height)
            collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] = 9
        }
        else{
        }
    }

    attack(hero){
        if (this.x === hero.x && this.y === hero.y) hero.healthStatus(this.attackPoints);
    }

    receiveDamage(damage){
        this.healthPoints -= damage;
        this.draw()
    }
    
    isAlive(){
        return this.healthPoints > 0;
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
            new Enemy(column*celPixels, row*celPixels, celPixels, celPixels, 6, 1)
        )
    }
}