

const bodyContainerImg = './images/decoration/body_container.png'
const blueScreenImg = './images/decoration/blue_screen.png'
const greenScreenImg = './images/decoration/green_screen.png'
const containerImg ='./images/decoration/container.png'
const ironhackImg = './images/decoration/ironhack_screen.png'

let bodyContainer = new SpriteObject(bodyContainerImg,
                            37,
                            11,
                            69,
                            43,
                            300,
                            3);

let bodyContainer2 = new SpriteObject(bodyContainerImg,
                            485,
                            396,
                            69,
                            43,
                            300,
                            3);
    
let bodyContainer3 = new SpriteObject(bodyContainerImg,
                            453,
                            683,
                            69,
                            43,
                            300,
                            3);

let container = new SpriteObject(containerImg,
                        645,
                        396,
                        69,
                        43,
                        300,
                        3);
let container2 = new SpriteObject(containerImg,
                        645,
                        460,
                        69,
                        43,
                        300,
                        3);
let container3 = new SpriteObject(containerImg,
                        677,
                        460,
                        69,
                        43,
                        300,
                        3);                        

let blueScreen = new SpriteObject(blueScreenImg,
                        328,
                        9,
                        147,
                        22,
                        300,
                        3);                 

let greenScreen = new SpriteObject(greenScreenImg,
                        513,
                        299,
                        97,
                        17,
                        300,
                        3);      

let greenScreen2 = new SpriteObject(greenScreenImg,
                            545,
                            299,
                            97,
                            17,
                            300,
                            3); 
let greenScreen3 = new SpriteObject(greenScreenImg,
                            609,
                            299,
                            97,
                            17,
                            300,
                            3); 
let greenScreen4 = new SpriteObject(greenScreenImg,
                            640,
                            651,
                            97,
                            17,
                            300,
                            3); 

let ironhackScreen = new SpriteObject(ironhackImg,
                            428,
                            9,
                            873,
                            22,
                            300,
                            9); 

function drawDecoration(){
    bodyContainer.update()
    bodyContainer.draw();
    bodyContainer2.update()
    bodyContainer2.draw();
    bodyContainer3.update()
    bodyContainer3.draw();
    container.update()
    container2.draw();
    container2.update()
    container3.draw();
    container3.update()
    container.draw();
    blueScreen.update()
    blueScreen.draw();
    greenScreen.update()
    greenScreen.draw();
    greenScreen2.update()
    greenScreen2.draw();
    greenScreen3.update()
    greenScreen3.draw();
    greenScreen4.update()
    greenScreen4.draw();
    ironhackScreen.update();
    ironhackScreen.draw();
}