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
        //ctx.clearRect(this.x-10, this.y-10, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.heigth);
    }

    attack(hero){
        if (this.x === hero.x && this.y === hero.y) hero.healthStatus(this.attackPoints);
    }

}