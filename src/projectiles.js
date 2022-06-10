class Projectile{
    constructor(image, x, y, width, height,quadrant, ratioXY, ratioYX, speed, damage){
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.quadrant = quadrant;
        this.ratioXY = ratioXY;
        this.speed = speed;
        this.damage = damage;
        if(ratioXY >= ratioYX){
            this.speedY = speed/(ratioXY + 1);
            this.speedX = ratioXY * this.speedY;
        }else{
            this.speedX = speed/(ratioYX + 1);
            this.speedY = ratioYX * this.speedX;
        }

        console.log(`Speed: ${this.speedX+this.speedY}`)
        console.log(`Speed x: ${this.speedX}`);
        console.log(`Speed y: ${this.speedY}`);
    }

    draw(){
        switch(this.quadrant){
            //                              |
            //  2nd quadrant: x neg, y neg  |  1st quadrant: x pos, y neg
            //                              |
            //                       ------hero-------
            //                              |
            //   3rd quarant: x neg, y pos  |  4th quadrant: x pos, y pos
            //                              |
            case 1:
                if( collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==2 &&
                    collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==1){
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.x +=this.speedX;
                    this.y -= this.speedY;
                }else if (collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] ===2 ){
                    enemy.receiveDamage(this.damage);
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }else{
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
            case 2:
                if( collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==2 &&
                collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==1){
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.x -=this.speedX;
                    this.y -= this.speedY;
                }else if (collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] ===2 ){
                    enemy.receiveDamage(this.damage);
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }else{
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }                

                break;
            case 3:
                if( collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==2 &&
                    collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==1){
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.x -=this.speedX;
                    this.y += this.speedY;
                }else if (collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] ===2 ){
                    enemy.receiveDamage(this.damage);
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }else{
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
            case 4:
                if( collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==2 &&
                    collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==1){
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.x +=this.speedX;
                    this.y += this.speedY;
                }else if (collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] ===2 ){
                    enemy.receiveDamage(this.damage);
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }else{
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
        }
       
    }

}