class Projectile{
    constructor(image, x, y, width, height,direction, speed, damage){
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = direction;
        this.speed = speed;
        this.damage = damage;
    }

    draw(){
        switch(this.direction){
            case 'right':
                if( collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==2 &&
                    collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==1){
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.x += this.speed;
                }else if (collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] ===2 ){
                    enemy.receiveDamage(this.damage);
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }else{
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
            case 'left':
                if(this.x > 0){
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.x -= this.speed;
                }else{
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
            case 'up':
                if(this.y >  0){
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.y -= this.speed;
                }else{
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
            case 'down':
                if(this.y < canvas.height){
                    this.y += this.speed;
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                }else{
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
        }
    }


}