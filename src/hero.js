class Hero{
    constructor(image, x, y, width, height, timePerFrame, numberOfFrames, healthPoints) {
        this.image = image;   
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
    }


    healthStatus(damage){
        if( this.isAlive() ) this.healthBar.value -= damage;
        else window.alert('Game Over')
    }
    
    isAlive(){
        return this.healthBar.value !== 0;
    }

    movementAllowed(movement){
        let arrayRow= this.y / celPixels;
        let arrayColumn = this.x /celPixels
        switch(movement){
            case 'right':
                if(collisionArray[arrayRow][arrayColumn+1] === 1) return false;
                return true;
            case 'left':
                if(collisionArray[arrayRow][arrayColumn-1] === 1 || arrayColumn === 0) return false;
                return true;
            case 'up':
                if(collisionArray[arrayRow-1][arrayColumn] === 1) return false;
                return true;
            case 'down':
                if(collisionArray[arrayRow+1][arrayColumn] === 1) return false;
                return true;
        }
                
    }

    move(e){
        if( e.keyCode === 87){
            // Key w pressed
            direction = 'up';
            if(this.movementAllowed(direction)) this.y -= 32;
            this.image.src = './images/hero/hero_weapon_up.png'
        }else if( e.keyCode === 83 ){
            // Key d pressed
            direction = 'down';
            if(this.movementAllowed(direction)) this.y += 32;
            this.image.src = './images/hero/hero_weapon_down.png'
        }else if( e.keyCode === 65 ){
            // Key s pressed
            direction = 'left';
            if(this.movementAllowed(direction)) this.x -= 32;
            this.image.src = './images/hero/hero_weapon_left.png'
        }else if( e.keyCode === 68 ){
            // Key d pressed
            direction = 'right';
            if(this.movementAllowed(direction)) this.x += 32;    
            this.image.src = './images/hero/hero_weapon_right.png'
        }
    }
}