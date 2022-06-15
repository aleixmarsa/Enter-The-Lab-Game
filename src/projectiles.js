const heroShootingSound = new Sound("./music/hero_shooting.wav");   
let blueBulletImg = './images/projectiles/blue_bullet.png'


class Projectile extends GameObject{
    constructor(imageSrc, x, y, width, height, quadrant, ratioXY, ratioYX, speed, damage){
        super(imageSrc, x ,y , width, height)
        this.quadrant = quadrant;
        this.ratioXY = ratioXY;
        this.ratioYX = ratioXY
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
    }


    enemyImpact(){
        this.calculateRowColumn();
        for (let enemy of totalEnemies){
            enemy.calculateRowColumn();
            if (this.row === enemy.row && this.column === enemy.column){
                enemy.receiveDamage(this.damage);
            }
        }
        totalProjectiles.splice(totalProjectiles.indexOf(this),1)
    }

    heroImpact(){
        this.calculateRowColumn();
        hero.calculateRowColumn();
            if (this.row === hero.row && this.column === hero.column){
                hero.receiveDamage(this.damage);
            }
        totalProjectiles.splice(totalProjectiles.indexOf(this),1)
    }

    draw(shooter){
        this.calculateRowColumn()
        if(!Number.isNaN(this.x) && !Number.isNaN(this.y) && this.row != undefined && this.column != undefined){
            //Checks collisions between bullet and walls(1) and between bullet and enemies(9)
            if((![1,9].includes(collisionArray[this.row][this.column]) && shooter.constructor.name === 'Hero') ||
                (![1,8].includes(collisionArray[this.row][this.column]) && shooter.constructor.name === 'RangeRobot')){
                //There is no collision
                switch(this.quadrant){
                    //                              |
                    //  2nd quadrant: x neg, y neg  |  1st quadrant: x pos, y neg
                    //                              |
                    //                    -------shooter-------
                    //                              |
                    //   3rd quarant: x neg, y pos  |  4th quadrant: x pos, y pos
                    //                              |
                    case 1:               
                        this.x += this.speedX;
                        this.y -= this.speedY;
                        break;
                    case 2:
                        this.x -= this.speedX;
                        this.y -= this.speedY;           
                        break;
                    case 3:
                        this.x -= this.speedX;
                        this.y += this.speedY;
                        break;
                    case 4:
                        this.x += this.speedX;
                        this.y += this.speedY;   
                }
                ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }else if(collisionArray[this.row][this.column] === 9 && shooter.constructor.name === 'Hero' ){
                //Collision with an enemy
                this.enemyImpact();
                totalProjectiles.splice(totalProjectiles.indexOf(this),1)
    
            }else if(collisionArray[this.row][this.column] === 8 && shooter.constructor.name === 'RangeRobot' ){
                hero.receiveDamage(shooter.attackPoints, shooter, true);
                shooter.projectiles.splice(shooter.projectiles.indexOf(this),1)

            }
            else{
                shooter.constructor.name === 'Hero' ? totalProjectiles.splice(totalProjectiles.indexOf(this),1) : shooter.projectiles.splice(shooter.projectiles.indexOf(this),1);
            }
        }else{
            console.log('NaN')
        }
    }
}

function shoot(e){
    if (hero.isAlive()){
        //Gets the click pos relative to canvas
        heroShootingSound.play();
        let pos = getMousePos(canvas, e)
        let quadrant = 1;
        //Gets the click pos realive to player
        pos.x = pos.x - hero.x;
        pos.y = pos.y - hero.y;
        if(pos.x === 0){
            pos.x = 1;
        }else if(pos.y === 0){
            pos.y = 1;
        }
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
            new Projectile(blueBulletImg,
                hero.x,
                hero.y,
                12,
                12,
                quadrant,
                ratioXY,
                ratioYX,
                16,
                hero.attackPoints)
        )
    }
    
}

function drawProjectiles(){
    for(let projectile of totalProjectiles){
        projectile.draw(hero)
    }
}