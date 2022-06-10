class Enemy{
    constructor(image, healthImg, x ,y , width, height, healthPoints, attackPoints){
        this.image = image;
        this.healthImg = healthImg;          
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
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
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            console.log(this.healthPoints);
            this.healthImg.src = '/images/ui/health_bar_'+this.healthPoints+'.png'
            ctx.drawImage(this.healthImg , this.x + this.image.width/4, this.y + this.image.height, this.healthImg.width, this.healthImg.height)
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