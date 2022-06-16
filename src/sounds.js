const sliderDOM = document.querySelector('#myRange');
const volumeDOM = document.querySelector('#volume-value');

class Sound {
    constructor (src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.volume = volume();
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
 }

 function volume(){
  volumeDOM.innerHTML = sliderDOM.value;

  return Number(sliderDOM.value/100);
}
