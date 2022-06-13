class Hero{
    constructor(image, x, y, width, height, timePerFrame, numberOfFrames, healthPoints) {
        this.image = image;   
        this.healthImg = new Image();
        this.x = x;                                 
        this.y = y;                            
        this.width = width;                         
        this.height = height;                       
        this.timePerFrame = timePerFrame;            
        this.numberOfFrames = numberOfFrames || 1; 
        this.healthPoints = healthPoints;
        //current frame index pointer
        this.frameIndex = 0;
        //time the frame index was last updated
        this.lastUpdate = Date.now();

    }

    //to update
    update = function() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }

    //to draw on the canvas, parameter is the ctx of the canvas to be drawn on
    draw_sprite() {
        ctx.drawImage(this.image, // Sprite Image
                          this.frameIndex*this.width/this.numberOfFrames, //sx Sprites x coordinate where the frame starts
                          0,    //sy Sprites y coordinate where to frame starts
                          this.width/this.numberOfFrames, //sWidth frame width
                          this.height,  //sHeight frame height
                          this.x,   //dx Canvas x coordinate where the image is positioned
                          this.y,   //dy Canvas y coordinate where the image is positioned
                          this.width/this.numberOfFrames,   //dWidth Image width to be drawn
                          this.height);    //dHeight Image height to be drawn
    }

    
    draw(){
        this.draw_sprite()
        //ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        this.healthImg.src = `/images/ui/health_bar_hero_${this.healthPoints}.png`
        ctx.drawImage(this.healthImg , this.x, this.y + this.height, this.healthImg.width, this.healthImg.height)
    }


    
    isAlive(){
        return this.healthPoints !== 0;
    }

    movementAllowed(movement){
        this.calculateRowColumn();
        switch(movement){
            case 'right':
                return [1,2].includes(collisionArray[this.row][this.column+1]) ? false : true;
            case 'left':    
                return [1,2].includes(collisionArray[this.row][this.column-1]) || this.column === 0 ? false : true;
            case 'up':
                return [1,2].includes(collisionArray[this.row-1][this.column]) ? false : true;
            case 'down':
                return [1,2].includes(collisionArray[this.row+1][this.column]) ? false : true;
        }
                
    }

    move(e){
        this.calculateRowColumn();
        if( e.keyCode === 87 || e === 'moveUp'){
            // Key w pressed
            direction = 'up';
            if(this.movementAllowed(direction)){
                collisionArray[this.row][this.column] = 0
                this.y -= celPixels;
                collisionArray[this.row-1][this.column] = 8
                movement = true;
            }

        }else if( e.keyCode === 83 ||  e === 'moveDown'){
            // Key d pressed
            direction = 'down';
            if(this.movementAllowed(direction)){
                collisionArray[this.row][this.column] = 0
                this.y += celPixels;
                collisionArray[this.row+1][this.column] = 8
                movement = true;
            }
        }else if( e.keyCode === 65  || e === 'moveLeft'){
            // Key s pressed
            direction = 'left';
            if(this.movementAllowed(direction)){
                collisionArray[this.row][this.column] = 0
                this.x -= celPixels;
                collisionArray[this.row][this.column-1] = 8
                movement = true;
            }
        }else if( e.keyCode === 68 || e === 'moveRight'){
            // Key d pressed
            direction = 'right';
            if(this.movementAllowed(direction)){
                collisionArray[this.row][this.column] = 0
                this.x += celPixels;  
                collisionArray[this.row][this.column+1] = 8
                movement = true;
            }  
        }

    }

    aim(e){
       if(movement){
            if(mousePosPlayer.x >= 0){
                //this.image.src = './images/hero/hero_weapon_right.png' 
                this.image.src = './images/hero/hero_run_right.png';
            }else{
                //this.image.src = './images/hero/hero_weapon_left.png';
                this.image.src = './images/hero/hero_run_left.png';
            }
        }
        else{
            if(mousePosPlayer.x >= 0){
                //this.image.src = './images/hero/hero_weapon_right.png' 
                this.image.src = './images/hero/hero_stop_right.png';
            }else{
                //this.image.src = './images/hero/hero_weapon_left.png';
                this.image.src = './images/hero/hero_stop_left.png';
            }
            
        }

    }

    receiveDamage(damage, enemy){
        this.calculateRowColumn();
        enemy.calculateRowColumn();

        if( this.isAlive() ){
            this.healthPoints -= damage;
            if(enemy.constructor.name === 'MeleeRobot'){
                if(this.row < enemy.row){
                    this.move(this.checkFreeAdjacentCell())
                }else if (this.row > enemy.row){
                    this.move(this.checkFreeAdjacentCell())
                }else if (this.column > enemy.column){
                    this.move(this.checkFreeAdjacentCell())
                }else{
                    this.move(this.checkFreeAdjacentCell())
                }
            }            
        }
        

    }

    calculateRowColumn(){
        this.row= Math.floor(this.y / celPixels);
        this.column = Math.floor(this.x /celPixels);
    }

    checkFreeAdjacentCell(){
        this.calculateRowColumn()
        if([0,3].includes(collisionArray[this.row-1][this.column])){
            return 'moveUp'
        }
        if([0,3].includes(collisionArray[this.row+1][this.column])){
            return 'moveDown'
        }
        if([0,3].includes(collisionArray[this.row][this.column+1])){
            return 'moveRight'
        }
        if([0,3].includes(collisionArray[this.row][this.column-1])){
            return 'moveLeft'
        }

    }
}