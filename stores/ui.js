import {action, runInAction, observable} from 'mobx';

class UIStore {
  @observable screen='settings';
  @observable width;
  @observable height;

  constructor() {
    this.setUISize();
    window.addEventListener('resize', () => {
      this.setUISize();
    })
  }

  @action setUISize() {
    this.width = document.body.offsetWidth;
    this.height = document.body.offsetHeight;
  }

  @action showKeyboard() { this.screen = 'keyboard' }
  @action showSettings() { this.screen = 'settings' }
}

export default UIStore;
