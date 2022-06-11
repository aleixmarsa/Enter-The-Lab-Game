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

        //Checks the ratio between x and y cick position.
        //Depending on wich axis position is bigger calculates the speed for each axis
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


    enemyImpact(bulletRow, bulletColumn){
        
        for (let enemy of totalEnemies){
            let enemyRow = Math.floor(enemy.y/celPixels)
            let enemyColumn = Math.floor(enemy.x/celPixels);
            if (bulletRow === enemyRow && bulletColumn === enemyColumn){
                console.log('enemy hitted')
                enemy.receiveDamage(this.damage);
            }
        }
        totalProjectiles.splice(totalProjectiles.indexOf(this),1)
    }

    draw(){
        let bulletRow = Math.floor(this.y/celPixels);
        let bulletColumn = Math.floor(this.x/celPixels);
        switch(this.quadrant){
            //                              |
            //  2nd quadrant: x neg, y neg  |  1st quadrant: x pos, y neg
            //                              |
            //                       ------hero-------
            //                              |
            //   3rd quarant: x neg, y pos  |  4th quadrant: x pos, y pos
            //                              |
            case 1:
                //Checks collisions between bullet and walls(1) and between bullet and enemies(9) 
                if( collisionArray[bulletRow][bulletColumn] !==9 &&
                    collisionArray[bulletRow][bulletColumn] !==1){
                    //There is no collision
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.x +=this.speedX;
                    this.y -= this.speedY;
                }else if (collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] === 9 ){
                    //Collision with an enemy
                    this.enemyImpact(bulletRow, bulletColumn);
                }else{
                    //Collision with a wall
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
            case 2:
                //Checks collisions between bullet and walls(1) and between bullet and enemies(2) 
                if( collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==9 &&
                collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==1){
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    //There is no collision
                    this.x -=this.speedX;
                    this.y -= this.speedY;
                }else if (collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] === 9 ){
                    //Collision with an enemy
                    this.enemyImpact(bulletRow, bulletColumn);
                }else{
                    //Collision with a wall
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }                
                break;
            case 3:
                //Checks collisions between bullet and walls(1) and between bullet and enemies(9) 
                if( collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==9 &&
                    collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==1){
                    //There is no collision
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.x -=this.speedX;
                    this.y += this.speedY;
                }else if (collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] === 9 ){
                    //Collision with an enemy
                    this.enemyImpact(bulletRow, bulletColumn);

                }else{
                    //Collision with a wall
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
            case 4:
                //Checks collisions between bullet and walls(1) and between bullet and enemies(9) 
                if( collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==9 &&
                    collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] !==1){
                    //There is no collision
                    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                    this.x +=this.speedX;
                    this.y += this.speedY;
                }else if (collisionArray[Math.floor(this.y/celPixels)][Math.floor(this.x/celPixels)] ===9 ){
                    //Collision with an enemy
                    this.enemyImpact(bulletRow, bulletColumn);

                }else{
                    //Collision with a wall
                    totalProjectiles.splice(totalProjectiles.indexOf(this),1)
                }
                break;
        }
       
    }

}