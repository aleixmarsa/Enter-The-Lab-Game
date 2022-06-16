const sliderDOM = document.querySelector('#myRange');
const volumeDOM = document.querySelector('#volume-value');

class Sound {
    constructor (src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.volume = gameVolume();
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        console.log(this.sound.volume)
    }

    play(){
      this.sound.play();
    }
    stop(){
      this.sound.pause();
    }

    volume(){
      this.sound.volume = gameVolume();
    }
 }

 function gameVolume(){
  volumeDOM.innerHTML = sliderDOM.value;
  return Number(sliderDOM.value/100);

}

let backgroundMusic = new Sound('./music/background_music.mp3');
let gameOverMusic = new Sound('./music/game_over.mp3');   
let gameWinMusic = new Sound('./music/game_win.mp3')
