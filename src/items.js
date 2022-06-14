const healthItemImg = './images/items/potion.png';

class Item{
    constructor(imageSrc,x ,y , width, height){
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