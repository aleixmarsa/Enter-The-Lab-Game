

const bodyContainerImg = './images/decoration/body_container.png'
const blueScreenImg = './images/decoration/blue_screen.png'
const greenScreenImg = './images/decoration/green_screen.png'
const containerImg ='./images/decoration/container.png'
const ironhackImg = './images/decoration/ironhack_screen.png'

let totalDecorative =[]


/*Creates animated decorative objects*/
totalDecorative.push(new SpriteObject(bodyContainerImg,
                        37,
                        11,
                        69,
                        43,
                        300,
                        3)) 

totalDecorative.push(new SpriteObject(bodyContainerImg,
                        485,
                        396,
                        69,
                        43,
                        300,
                        3));

totalDecorative.push(new SpriteObject(bodyContainerImg,
                        453,
                        683,
                        69,
                        43,
                        300,
                        3));

totalDecorative.push(new SpriteObject(containerImg,
                    645,
                    396,
                    69,
                     43,
                    300,
                    3));
totalDecorative.push(new SpriteObject(containerImg,
                        645,
                        460,
                        69,
                        43,
                        300,
                        3));
totalDecorative.push(new SpriteObject(containerImg,
                        677,
                        460,
                        69,
                        43,
                        300,
                        3));                        

totalDecorative.push(new SpriteObject(blueScreenImg,
                        328,
                        9,
                        147,
                        22,
                        300,
                        3));                 

totalDecorative.push(new SpriteObject(greenScreenImg,
                        513,
                        299,
                        97,
                        17,
                        300,
                        3));      

totalDecorative.push(new SpriteObject(greenScreenImg,
                            545,
                            299,
                            97,
                            17,
                            300,
                            3)); 
totalDecorative.push(new SpriteObject(greenScreenImg,
                            609,
                            299,
                            97,
                            17,
                            300,
                            3)); 
totalDecorative.push(new SpriteObject(greenScreenImg,
                            640,
                            651,
                            97,
                            17,
                            300,
                            3)); 

totalDecorative.push(new SpriteObject(ironhackImg,
                            428,
                            9,
                            873,
                            22,
                            300,
                            9)); 


/*Draws each decorative object*/
function drawDecoration(){
    for(let object of totalDecorative){
        object.update();
        object.draw();
    }
}