class GameObject{

    constructor(imageSrc, x ,y , width, height){
        this.image = new Image();
        this.image.src = imageSrc;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    calculateRowColumn(){
        this.row= Math.floor(this.y / celPixels);
        this.column = Math.floor(this.x /celPixels);
    }
}

class SpriteObject extends GameObject{

    constructor(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames){
        super(imageSrc,x ,y , width, height)
        this.timePerFrame = timePerFrame;
        this.numberOfFrames = numberOfFrames || 1;
        //current frame index pointer
        this.frameIndex = 0;
    }

    draw(){
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

    calculateRowColumn(){
        this.row= Math.round(this.y / celPixels);
        this.column = Math.round(this.x /celPixels);
    }
}

class AliveObject extends SpriteObject{

    constructor(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames, healthPoints, attackPoints, deathSoundSrc){
        super(imageSrc,x ,y , width, height, timePerFrame, numberOfFrames);
        this.healthImg = new Image();
        this.healthPoints = healthPoints;
        this.attackPoints = attackPoints;        
        //time the frame index was last updated
        this.lastUpdate = Date.now();
        this.deathFrame = 0;
        this.deathSound = new Sound(deathSoundSrc);
    }

    update(){
        if(this.isAlive()){
            if(Date.now() - this.lastUpdate >= this.timePerFrame) {
                this.frameIndex++;
                if(this.frameIndex >= this.numberOfFrames) {
                    this.frameIndex = 0;
                }
                this.lastUpdate = Date.now();
            }
        }else{
            if(Date.now() - this.lastUpdate >= this.timePerFrame) {
                this.deathFrame++;
                this.lastUpdate = Date.now();
            }
        }
    }

    isAlive(){
        if(this.healthPoints > 0){
            return true;
        }
        return false;
    }


}
