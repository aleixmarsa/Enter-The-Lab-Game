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
let gameDifficult = 1;
const gameRunDOM = document.querySelector('#game-running');
const gameOverDOM = document.querySelector('#game-over')
const initDOM =  document.querySelector('#init-screen');
const gameWinDOM = document.querySelector('#game-win')
const enemiesDOM = document.querySelector('#enemies-left')
const healthDOM = document.querySelector('#health-points')
const settingsDOM = document.querySelector('#settings-screen')
const easyModeDOM = document.querySelector('#easy');
const hardModeDOM = document.querySelector('#hard');
const difficultDOM = document.querySelector('#difficult-mode');


let requestId;
let gameStarted = false;
let meleeEnemies = 0;
let rangeEnemies = 10;




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
        e.preventDefault();
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
            gameWinMusic.volume();
            gameWinMusic.play();
            cancelAnimationFrame(requestId)
            gameWinDOM.style.display = 'flex';
            removeEventListeners();
        }
    }else{
        backgroundMusic.stop();
        gameOverMusic.volume();
        gameOverMusic.play()
        cancelAnimationFrame(requestId)
        gameOverDOM.style.display = 'flex';
        removeEventListeners();

    }
}


function addEventListeners(){
    window.addEventListener('keydown', keyPressed)
    window.addEventListener('mousemove', mousePosition)
    window.addEventListener('click', mouseClick)
    window.addEventListener('keyup', keyRelease)
}

function removeEventListeners(){
    window.removeEventListener('keydown', keyPressed)
    window.removeEventListener('mousemove', mousePosition)
    window.removeEventListener('click', mouseClick)
    window.removeEventListener('keyup', keyRelease)
}

function difficult(mode){
    if(mode ==='easy'){
        easyModeDOM.style.border = '1px solid #95cc4f'
        hardModeDOM.style.border = 'none'
        gameDifficult = 1;
        difficultDOM.innerHTML = 'EASY';
    }
    else{
        hardModeDOM.style.border = '1px solid #95cc4f'
        easyModeDOM.style.border = 'none'
        gameDifficult = 2;
        difficultDOM.innerHTML = 'HARD';

    }
}



//The Game Loop
function loop() {
    map.clear();
    map.draw();
    hero.draw();
    drawEnemies(totalEnemies)
    drawObjects(totalProjectiles, hero);
    drawObjects(totalItems)
    drawDecoration();
    checkMap()   
    gameStatus();
}

function start(){
    initDOM.style.display = 'none';
    gameOverDOM.style.display = 'none'
    gameWinDOM.style.display = 'none'
    settingsDOM.style.display = 'none'
    gameRunDOM.style.display = 'block'
    // canvas.style.display = 'block';
    gameStarted = true;
    gameOver = false;
    mapDone = false;
    gameOverMusic.stop();
    backgroundMusic.volume();
    backgroundMusic.play();
    removeEnemies();
    removeItems();
    removeProjectiles();
    spawnMap();
    collisionArray = createCollisionArray(mapArray);
    spawnHero();
    spawnEnemies(meleeEnemies,rangeEnemies);
    addEventListeners();
    loop()
}

function initial(){
    gameOverDOM.style.display = 'none'
    gameWinDOM.style.display = 'none'
    gameRunDOM.style.display = 'none'
    settingsDOM.style.display = 'none'
    initDOM.style.display = 'block';
    gameStarted = false;
    gameOver = false;
    mapDone = false;
    removeEnemies();
    removeItems();
    removeProjectiles();
    gameOverMusic.stop();
    gameWinMusic.stop();
    backgroundMusic.stop();
}



function settings(){
    gameOverDOM.style.display = 'none'
    gameWinDOM.style.display = 'none'
    gameRunDOM.style.display = 'none'
    initDOM.style.display = 'none';
    settingsDOM.style.display = 'flex'

}





