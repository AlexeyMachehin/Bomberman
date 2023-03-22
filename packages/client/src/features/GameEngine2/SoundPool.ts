export enum Sound {
  step,
  bombInstall,
  explosion,
  enemyDeath,
  playerDeath,
}

export class SoundPool {
  size: number;
  volume: number;
  pool: HTMLAudioElement[];
  currSound: number;

  constructor(maxSize: number, volume: number) {
    this.size = maxSize;
    this.volume = volume;
    this.pool = [];
    this.currSound = 0;
  }

  init(sound: Sound) {
    for (let i = 0; i < this.size; i++) {
      let audio: HTMLAudioElement;

      switch(sound) {
        case Sound.step:
          audio = new Audio("@/../static/step.wav");
          audio.volume = this.volume / 5;
          break;
        case Sound.bombInstall:
          audio = new Audio("@/../static/bomb-install.wav");
          audio.volume = this.volume;
          break;
        case Sound.explosion:
          audio = new Audio("@/../static/explosion.wav");
          audio.volume = this.volume / 50;
          break;
        case Sound.enemyDeath:
          audio = new Audio("@/../static/enemy-death.wav");
          audio.volume = this.volume;
          break;
        case Sound.playerDeath:
          audio = new Audio("@/../static/player-death.wav");
          audio.volume = this.volume;
          break;
      }

      audio.volume = this.volume;
      audio.load();
      this.pool[i] = audio;
    }
	};

	get() {
		if(this.pool[this.currSound].currentTime === 0 || this.pool[this.currSound].ended) {
			this.pool[this.currSound].play();
		}
		
    this.currSound = (this.currSound + 1) % this.size;
	};
}
