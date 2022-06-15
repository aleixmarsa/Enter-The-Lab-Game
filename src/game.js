const canvas = document.querySelector('#canvas');
canvas.width = 800;
canvas.height = 800;
canvas.style.cursor = "crosshair";
const ctx = canvas.getContext('2d');

const celPixels = 32;
let hero;
let map;
let map_done;
let collisionArray;
let totalProjectiles = [];
let totalEnemies = [];
let totalItems = [];
let mousePos;
let mousePosPlayer;
let gameOver = false;
const gameRunDOM = document.querySelector('#game-running');
const gameOverDOM = document.querySelector('#game-over')
const startDOM =  document.querySelector('#start-game');
const gameWinDOM = document.querySelector('#game-win')
const enemiesDOM = document.querySelector('#enemies-left')
const healthDOM = document.querySelector('#health-points')


let requestId;
let gameStarted = false;
let meleeEnemies = 5;
let rangeEnemies = 5;
const backgroundMusic = new Sound('./music/background_music.mp3');
const gameOverMusic = new Sound('./music/game_over.mp3');   
const gameWinMusic = new Sound('./music/game_win.mp3')



//update function to update all the GameObjects
function update(object) {
    object.update();
}

function keyPressed(e){
    hero.move(e); 
}

function keyRelease(e){
    movement = false;
}

function mouseClick(e){
    if(gameStarted){
        shoot(e);
    }
}

function getMousePos(canvas, e) {
    let rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
}

function mousePosition(e){
    mousePos = getMousePos(canvas, e);
    mousePosPlayer = mousePos;
    mousePosPlayer.x = mousePos.x - hero.x;
    mousePosPlayer.y = mousePos.y - hero.y;
    hero.aim(e);
    //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
}


function gameStatus(){
    if(!gameOver){
        requestId = requestAnimationFrame(loop);
        if(map_done && hero.x > map.width){
            backgroundMusic.stop();
            gameWinMusic.play();
            cancelAnimationFrame(requestId)
            gameWinDOM.style.display = 'block';
        }
    }else{
        backgroundMusic.stop();
        gameOverMusic.play()
        cancelAnimationFrame(requestId)
        gameOverDOM.style.display = 'flex';

    }
}


//The Game Loop
function loop() {
    map.clear();
    map.draw();
    hero.draw();
    drawDecoration();
    drawProjectiles();
    drawEnemies();
    drawItems();
    checkMap()   
    gameStatus();
}

function start(){
    console.log(startDOM)
    startDOM.style.display = 'none';
    gameOverDOM.style.display = 'none'
    gameWinDOM.style.display = 'none'
    gameRunDOM.style.display = 'block'
    // canvas.style.display = 'block';
    window.addEventListener('keydown', keyPressed)
    window.addEventListener('mousemove', mousePosition)
    window.addEventListener('click', mouseClick)
    window.addEventListener('keyup', keyRelease)
    gameStarted = true;
    gameOver = false;
    mapDone = false;
    removeEnemies();
    removeItems()
    gameOverMusic.stop();
    backgroundMusic.play();
    spawnMap();
    collisionArray = createCollisionArray(mapArray);
    spawnHero();
    spawnEnemies(meleeEnemies,rangeEnemies);
    loop()
}






