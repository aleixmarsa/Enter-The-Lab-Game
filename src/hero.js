class Hero{
    constructor(spritesheet, x, y, width, height, timePerFrame, numberOfFrames, healthPoints) {
        this.spritesheet = spritesheet;             
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
        this.healthBar = document.getElementById("health")
        this.healthBar.max = this.healthPoints;
        this.healthBar.value = this.healthPoints;
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
    draw = function() {
        ctx.clearRect(this.x-20,this.y-20,this.width, this.height+40);
        ctx.drawImage(this.spritesheet,
                          this.frameIndex*this.width/this.numberOfFrames,
                          0,
                          this.width/this.numberOfFrames,
                          this.height,
                          this.x,
                          this.y,
                          this.width/this.numberOfFrames,
                          this.height);
    }

    healthStatus(damage){
        if( this.isAlive() ) this.healthBar.value -= damage;
        else window.alert('Game Over')
    }
    
    isAlive(){
        return this.healthBar.value !== 0;
    }
    
}