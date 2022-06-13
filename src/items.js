class Item{
    constructor(imageSrc, x, y, width, height, timePerFrame, numberOfFrames) {
        this.image = new Image();
        this.image.src = imageSrc
        this.x = x;                                 
        this.y = y;                            
        this.width = width;                         
        this.height = height;                       
        this.timePerFrame = timePerFrame;            
        this.numberOfFrames = numberOfFrames || 1; 
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
}