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

const bodyContainerImg = './images/items/body_container.png'
const blueScreenImg = './images/items/blue_screen.png'
const greenScreenImg = './images/items/green_screen.png'
const containerImg ='./images/items/container.png'

let bodyContainer = new Item(bodyContainerImg,
                            37,
                            11,
                            69,
                            43,
                            300,
                            3);

let bodyContainer2 = new Item(bodyContainerImg,
                            485,
                            396,
                            69,
                            43,
                            300,
                            3);
    
let bodyContainer3 = new Item(bodyContainerImg,
                            453,
                            683,
                            69,
                            43,
                            300,
                            3);

let container = new Item(containerImg,
                        645,
                        396,
                        69,
                        43,
                        300,
                        3);
let container2 = new Item(containerImg,
                        645,
                        460,
                        69,
                        43,
                        300,
                        3);
let container3 = new Item(containerImg,
                        677,
                        460,
                        69,
                        43,
                        300,
                        3);                        

let blueScreen = new Item(blueScreenImg,
                        328,
                        9,
                        147,
                        22,
                        300,
                        3);                 

let greenScreen = new Item(greenScreenImg,
                        513,
                        299,
                        97,
                        17,
                        300,
                        3);      

let greenScreen2 = new Item(greenScreenImg,
                            545,
                            299,
                            97,
                            17,
                            300,
                            3); 
let greenScreen3 = new Item(greenScreenImg,
                            609,
                            299,
                            97,
                            17,
                            300,
                            3); 
let greenScreen4 = new Item(greenScreenImg,
                            640,
                            651,
                            97,
                            17,
                            300,
                            3); 

function drawItems(){
    bodyContainer.update()
    bodyContainer.draw_sprite();
    bodyContainer2.update()
    bodyContainer2.draw_sprite();
    bodyContainer3.update()
    bodyContainer3.draw_sprite();
    container.update()
    container2.draw_sprite();
    container2.update()
    container3.draw_sprite();
    container3.update()
    container.draw_sprite();
    blueScreen.update()
    blueScreen.draw_sprite();
    greenScreen.update()
    greenScreen.draw_sprite();
    greenScreen2.update()
    greenScreen2.draw_sprite();
    greenScreen3.update()
    greenScreen3.draw_sprite();
    greenScreen4.update()
    greenScreen4.draw_sprite();
}