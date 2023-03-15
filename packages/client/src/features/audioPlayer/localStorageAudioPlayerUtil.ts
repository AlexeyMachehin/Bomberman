class LocalStorageAudioPlayerUtil {
  isOnMusicPlayer: string;
  volumeLevel: string;

  constructor() {
    this.isOnMusicPlayer = 'isOnMusicPlayer';
    this.volumeLevel = 'volumeLevel';
  }

  getIsOnPlayer() {
    const playerLocalStorage = localStorage.getItem(this.isOnMusicPlayer);
    if (playerLocalStorage !== null) {
      return JSON.parse(playerLocalStorage);
    }
    return false;
  }
  setIsOnPlayer() {
    localStorage.setItem(this.isOnMusicPlayer, JSON.stringify(true));
  }
  setIsOffPlayer() {
    localStorage.setItem(this.isOnMusicPlayer, JSON.stringify(false));
  }

  toggleIsOnPlayer() {
    localStorage.setItem(
      this.isOnMusicPlayer,
      JSON.stringify(this.getIsOnPlayer() ? false : true)
    );
  }

  getVolumeLevel() {
    const volumeLevel = localStorage.getItem(this.volumeLevel);
    if (volumeLevel !== null) {
      return JSON.parse(volumeLevel);
    }
    return null;
  }

  setVolumeLevel(volumeLevel: number) {
    localStorage.setItem(this.volumeLevel, JSON.stringify(volumeLevel));
  }
}
export const localStorageAudioPlayerUtil = new LocalStorageAudioPlayerUtil();
