class LocalStoragePlayerUtil {
  keyName: string;
  constructor() {
    this.keyName = 'isOnMusicPlayer';
  }
  getIsOnPlayer() {
    const playerLocalStorage = localStorage.getItem(this.keyName);
    if (playerLocalStorage !== null) {
      return JSON.parse(playerLocalStorage);
    }
    return false;
  }
  setIsOnPlayer() {
    localStorage.setItem(this.keyName, JSON.stringify(true));
  }
  setIsOffPlayer() {
    localStorage.setItem(this.keyName, JSON.stringify(false));
  }

  toggleIsOnPlayer() {
    localStorage.setItem(
      this.keyName,
      JSON.stringify(this.getIsOnPlayer() ? false : true)
    );
  }
}
export const localStoragePlayerUtil = new LocalStoragePlayerUtil();
