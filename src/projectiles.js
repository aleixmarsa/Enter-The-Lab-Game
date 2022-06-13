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


    enemyImpact(){
        this.calculateRowColumn();
        for (let enemy of totalEnemies){
            enemy.calculateRowColumn();
            if (this.row === enemy.row && this.column === enemy.column){
                console.log('enemy hitted')
                enemy.receiveDamage(this.damage);
            }
        }
        totalProjectiles.splice(totalProjectiles.indexOf(this),1)
    }

    draw(){
        if(!Number.isNaN(this.x) && !Number.isNaN(this.y)){
            this.calculateRowColumn()
            //Checks collisions between bullet and walls(1) and between bullet and enemies(9) 
            if( ![1,9].includes(collisionArray[this.row][this.column])){
                //There is no collision
                switch(this.quadrant){
                    //                              |
                    //  2nd quadrant: x neg, y neg  |  1st quadrant: x pos, y neg
                    //                              |
                    //                      -------hero-------
                    //                              |
                    //   3rd quarant: x neg, y pos  |  4th quadrant: x pos, y pos
                    //                              |
                    case 1:                      
                        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                        this.x +=this.speedX;
                        this.y -= this.speedY;
                        break;
                    case 2:
                        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                        this.x -=this.speedX;
                        this.y -= this.speedY;           
                        break;
                    case 3:
                        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                        this.x -=this.speedX;
                        this.y += this.speedY;
                        break;
                    case 4:
                        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
                        this.x +=this.speedX;
                        this.y += this.speedY;
                        break;
                }
            }else if(collisionArray[this.row][this.column] ===9 ){
                //Collision with an enemy
                this.enemyImpact();
    
            }else{
                //Collision with a wall
                totalProjectiles.splice(totalProjectiles.indexOf(this),1)
            }
        }
       
    }

    calculateRowColumn(){
        this.row= Math.floor(this.y / celPixels);
        this.column = Math.floor(this.x /celPixels);
    }

}

function mouseClick(e){
    //Gets the click pos relative to canvas
    let pos = getMousePos(canvas, e)
    let quadrant = 1;
    //Gets the click pos realive to player
    pos.x = pos.x - hero.x;
    pos.y = pos.y - hero.y;
    const ratioXY = Math.abs(pos.x/pos.y);
    const ratioYX = Math.abs(pos.y/pos.x);

    if( pos.x < 0 && pos.y < 0 ){
        quadrant = 2;
    }else if( pos.x < 0 && pos.y > 0 ){
        quadrant = 3;
    }else if( pos.x > 0 && pos.y > 0 ){
        quadrant = 4;
    }

    totalProjectiles.push(
        new Projectile(greenBulletImg,
            hero.x,
            hero.y,
            greenBulletImg.width,
            greenBulletImg.height,
            quadrant,
            ratioXY,
            ratioYX,
            16,
            1)
    )
}