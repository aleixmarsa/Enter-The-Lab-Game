class Enemy{
    constructor(image,x,y,width,heigth, healthPoints, attackPoints){
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.heigth = heigth;
        this.healthPoints = healthPoints;
        this.attackPoints = attackPoints;
    }

    move(heroX, heroY){
        if (this.x > heroX) this.x -= 1;
        else if(this.x < heroX) this.x += 1;
        if (this.y > heroY) this.y -= 1;
        else if (this.y < heroY) this.y += 1;
    }
    
    draw(){
        if (this.isAlive()){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth);
            collisionArray[this.y/celPixels][this.x/celPixels] = 2
            collisionArray[this.y/celPixels+1][this.x/celPixels] = 2
        }
        else{
            collisionArray[this.y/celPixels][this.x/celPixels] = 0
            collisionArray[this.y/celPixels+1][this.x/celPixels] = 0
        }
    }

    attack(hero){
        if (this.x === hero.x && this.y === hero.y) hero.healthStatus(this.attackPoints);
    }

    receiveDamage(damage){
        console.log(this.healthPoints)
        this.healthPoints -= damage;
    }
    
    isAlive(){
        return this.healthPoints > 0;
    }

}