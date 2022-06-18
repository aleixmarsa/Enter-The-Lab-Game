//Sound variables
const healingSound = new Sound("./music/healing.wav");
const damagedSound = new Sound("./music/hero_damaged.wav");
const heroDestroyedSound = "./music/hero_dead.wav";

//Image variables
const heroDeathImg = "./images/hero/hero_death.png";

let direction = "up";
let movement = false;

class Hero extends AliveObject {
  constructor(
    imageSrc,
    x,
    y,
    width,
    height,
    timePerFrame,
    numberOfFrames,
    healthPoints,
    attackPoints,
    deathSoundSrc
  ) {
    super(
      imageSrc,
      x,
      y,
      width,
      height,
      timePerFrame,
      numberOfFrames,
      healthPoints,
      attackPoints,
      deathSoundSrc
    );
    this.maxHealth = healthPoints;
  }

  draw() {
    this.update();
    //If the hero is dead then sets parameters for death sound and sprite
    if (!this.isAlive()) {
      this.numberOfFrames = 6;
      if (this.deathFrame <= this.numberOfFrames - 1) {
        this.deathSound.play();
        this.image.src = heroDeathImg;
        this.width = 204;
        this.height = 32;
        this.timePerFrame = 300;
        this.frameIndex = this.deathFrame;
      } else {
        //Game is over when the death sprite is over
        gameOver = true;
      }
    }
    ctx.drawImage(
      this.image, // Sprite Image
      (this.frameIndex * this.width) / this.numberOfFrames, //sx Sprites x coordinate where the frame starts
      0, //sy Sprites y coordinate where to frame starts
      this.width / this.numberOfFrames, //sWidth frame width
      this.height, //sHeight frame height
      this.x, //dx Canvas x coordinate where the image is positioned
      this.y, //dy Canvas y coordinate where the image is positioned
      this.width / this.numberOfFrames, //dWidth Image width to be drawn
      this.height
    ); //dHeight Image height to be drawn
    if (this.healthPoints >= 0) {
      this.healthImg.src = `./images/ui/health_bar_hero_${this.healthPoints}.png`;
    }

    healthDOM.innerHTML =
      this.healthPoints > 0 ? (this.healthPoints - 1) * 10 : 0;
    ctx.drawImage(
      this.healthImg,
      this.x,
      this.y + this.height,
      this.healthImg.width,
      this.healthImg.height
    );
  }

  //Checks if movement is allowed
  movementAllowed(movement) {
    this.calculateRowColumn();
    //Checks next matrix position depending on the next movement. 1(wall) and 2(static item) are forbidden
    switch (movement) {
      case "right":
        return [1, 2].includes(collisionArray[this.row][this.column + 1])
          ? false
          : true;
      case "left":
        return [1, 2].includes(collisionArray[this.row][this.column - 1]) ||
          this.column === 0
          ? false
          : true;
      case "up":
        return [1, 2].includes(collisionArray[this.row - 1][this.column])
          ? false
          : true;
      case "down":
        return [1, 2].includes(collisionArray[this.row + 1][this.column])
          ? false
          : true;
    }
  }

  //Moves the hero using the keys WASD. Puts the current pos to 0(no obstacle) and the next to 8(hero)
  move(e) {
    if (this.isAlive()) {
      this.calculateRowColumn();
      if (e.keyCode === 87 || e === "moveUp") {
        // Key w pressed
        direction = "up";
        if (this.movementAllowed(direction)) {
          collisionArray[this.row][this.column] = 0;
          this.y -= celPixels;
          collisionArray[this.row - 1][this.column] = 8;
          movement = true;
        }
      } else if (e.keyCode === 83 || e === "moveDown") {
        // Key d pressed
        direction = "down";
        if (this.movementAllowed(direction)) {
          collisionArray[this.row][this.column] = 0;
          this.y += celPixels;
          collisionArray[this.row + 1][this.column] = 8;
          movement = true;
        }
      } else if (e.keyCode === 65 || e === "moveLeft") {
        // Key s pressed
        direction = "left";
        if (this.movementAllowed(direction)) {
          collisionArray[this.row][this.column] = 0;
          this.x -= celPixels;
          collisionArray[this.row][this.column - 1] = 8;
          movement = true;
        }
      } else if (e.keyCode === 68 || e === "moveRight") {
        // Key d pressed
        direction = "right";
        if (this.movementAllowed(direction)) {
          collisionArray[this.row][this.column] = 0;
          this.x += celPixels;
          collisionArray[this.row][this.column + 1] = 8;
          movement = true;
        }
      }
      this.healing();
    }
  }

  //Changes the hero sprite
  aim(e) {
    if (this.isAlive()) {
      let state = "stop";
      if (movement) {
        state = "run";
      }
      if (mousePosPlayer.x >= 0) {
        this.image.src = `./images/hero/hero_${state}_right.png`;
      } else {
        this.image.src = `./images/hero/hero_${state}_left.png`;
      }
    }
  }

 shoot(e) {
    e.preventDefault();
    if (hero.isAlive()) {
      let quadrantInfo = calculateQuadrant(e, hero);
      totalProjectiles.push(
        new Projectile(
          blueBulletImg,
          hero.x,
          hero.y,
          12,
          12,
          quadrantInfo.quadrant,
          quadrantInfo.ratioXY,
          quadrantInfo.ratioYX,
          16,
          hero.attackPoints,
          heroShootingSound
        )
      );
      totalProjectiles.at(-1).projectileSound.play();
    }
  }



  /*Decrease the hero life when attacked. If enemy is a melee robot (explodes) and insta decrease but if enemy
    is a range robot, each attack decreases life and moves the hero 1 free cell away*/
  receiveDamage(damage, enemy, enemyProjectile) {
    this.calculateRowColumn();
    if (this.isAlive()) {
      damagedSound.volume();
      damagedSound.play();
      this.healthPoints -= damage;
      if (enemy.constructor.name === "RangeRobot" && !enemyProjectile) {
        this.move(this.checkFreeAdjacentCell());
      }
    }
    if (this.healthPoints < 0) {
      this.healthPoints = 0;
    }
  }

  //Checks for an adjacent free cell
  checkFreeAdjacentCell() {
    this.calculateRowColumn();
    if ([0, 3].includes(collisionArray[this.row - 1][this.column])) {
      return "moveUp";
    }
    if ([0, 3].includes(collisionArray[this.row + 1][this.column])) {
      return "moveDown";
    }
    if ([0, 3].includes(collisionArray[this.row][this.column + 1])) {
      return "moveRight";
    }
    if ([0, 3].includes(collisionArray[this.row][this.column - 1])) {
      return "moveLeft";
    }
  }

  //Checks if hero is at a healing potion position and heals himself
  healing() {
    this.calculateRowColumn();
    for (let item of totalItems) {
      item.calculateRowColumn();
      if (this.comparePositions(this, item, 0, 0)) {
        if (this.healthPoints < this.maxHealth) {
          healingSound.volume();
          healingSound.play();
          this.healthPoints += 2;
          totalItems.splice(totalItems.indexOf(item), 1);
        }
      }
    }
    if (this.healthPoints > this.maxHealth) {
      this.healthPoints = this.maxHealth;
    }
  }
}

//Spawns the hero
function spawnHero() {
  hero = new Hero(
    "./images/hero/hero_stop_right.png", //the spritesheet image
    0, //x position of hero
    96, //y position of hero
    128, //total width of spritesheet image in pixels
    32, //total height of spritesheet image in pixels
    150, //time(in ms) duration between each frame change (experiment with it to get faster or slower animation)
    4,
    11,
    1,
    heroDestroyedSound
  );
}
