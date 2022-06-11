class Enemy{
    constructor(image, x ,y , width, height, healthPoints, attackPoints){
        this.image = image;
        this.healthImg = new Image();          
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.healthPoints = healthPoints;
        this.attackPoints = attackPoints;
    }

    move(){
        if (this.x > this.pathToHeroX) this.x -= 1;
        else if(this.x < this.pathToHeroX) this.x += 1;
        if (this.y > this.pathToHeroY) this.y -= 1;
        else if (this.y < this.pathToHeroX) this.y += 1;
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
            collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] = 0
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