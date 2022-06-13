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

    // //to draw on the canvas, parameter is the ctx of the canvas to be drawn on
    // draw_sprite = function() {
    //     ctx.clearRect(this.x-20,this.y-20,this.width, this.height+40);
    //     ctx.drawImage(this.spritesheet, // Sprite Image
    //                       this.frameIndex*this.width/this.numberOfFrames, //sx Sprites x coordinate where the frame starts
    //                       0,    //sy Sprites y coordinate where to frame starts
    //                       this.width/this.numberOfFrames, //sWidth frame width
    //                       this.height,  //sHeight frame height
    //                       this.x,   //dx Canvas x coordinate where the image is positioned
    //                       this.y,   //dy Canvas y coordinate where the image is positioned
    //                       this.width/this.numberOfFrames,   //dWidth Image width to be drawn
    //                       this.height);    //dHeight Image height to be drawn
    //    console.log(this.width/this.numberOfFrames)
    // }

    
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
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
        if( e.keyCode === 87 || e === 'downHit'){
            // Key w pressed
            direction = 'up';
            if(this.movementAllowed(direction)){
                collisionArray[this.row][this.column] = 0
                this.y -= celPixels;
                collisionArray[this.row-1][this.column] = 8

            } 
        }else if( e.keyCode === 83 || e === 'upHit' ){
            // Key d pressed
            direction = 'down';
            if(this.movementAllowed(direction)){
                collisionArray[this.row][this.column] = 0
                this.y += celPixels;
                collisionArray[this.row+1][this.column] = 8
            }
        }else if( e.keyCode === 65  || e === 'leftHit'){
            // Key s pressed
            direction = 'left';
            if(this.movementAllowed(direction)){
                collisionArray[this.row][this.column] = 0
                this.x -= celPixels;
                collisionArray[this.row][this.column-1] = 8
            }
        }else if( e.keyCode === 68 || e === 'rightHit' ){
            // Key d pressed
            direction = 'right';
            if(this.movementAllowed(direction)){
                collisionArray[this.row][this.column] = 0
                this.x += celPixels;  
                collisionArray[this.row][this.column+1] = 8
            }  
        }
        

    }

    aim(e){
        if(mousePosPlayer.x >= 0){
            this.image.src = './images/hero/hero_weapon_right.png' 
        }else{
            this.image.src = './images/hero/hero_weapon_left.png'
        }
    }

    receiveDamage(damage, enemy){
        this.calculateRowColumn();
        enemy.calculateRowColumn();

        if( this.isAlive() ){
            console.log(this.healthPoints)
            this.healthPoints -= damage;
            if(this.row < enemy.row){
                this.move('downHit')
            }else if (this.row > enemy.row){
                this.move('upHit')
            }else if (this.column > enemy.column){
                this.move('rightHit')
            }else{
                this.move('leftHit')
            }

            
        }
        

    }

    calculateRowColumn(){
        this.row= Math.floor(this.y / celPixels);
        this.column = Math.floor(this.x /celPixels);
    }
}