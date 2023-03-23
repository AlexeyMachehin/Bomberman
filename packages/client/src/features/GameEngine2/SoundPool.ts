import step from '../../../static/step.wav';
import bombInstall from '../../../static/bomb-install.wav';
import explosion from '../../../static/explosion.wav';
import enemyDeath from '../../../static/enemy-death.wav';
import playerDeath from '../../../static/player-death.wav';

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

      switch (sound) {
        case Sound.step:
          audio = new Audio(step);
          audio.volume = this.volume / 5;
          break;
        case Sound.bombInstall:
          audio = new Audio(bombInstall);
          audio.volume = this.volume;
          break;
        case Sound.explosion:
          audio = new Audio(explosion);
          audio.volume = this.volume / 50;
          break;
        case Sound.enemyDeath:
          audio = new Audio(enemyDeath);
          audio.volume = this.volume;
          break;
        case Sound.playerDeath:
          audio = new Audio(playerDeath);
          audio.volume = this.volume;
          break;
      }

      audio.volume = this.volume;
      audio.load();
      this.pool[i] = audio;
    }
  }

  get() {
    if (
      this.pool[this.currSound].currentTime === 0 ||
      this.pool[this.currSound].ended
    ) {
      this.pool[this.currSound].play();
    }

    this.currSound = (this.currSound + 1) % this.size;
  }
}
