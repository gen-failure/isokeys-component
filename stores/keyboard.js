import {action, computed, observable} from 'mobx';
import notations from '../notations';

const KeyboardStore = class {
  @observable intervalY;
  @observable intervalX;
  @observable width=17;
  @observable height=9;

  @observable intervals = {}
  @observable basicTones = [];
  @observable rootTones = [];
  @observable octaves = [];
  @observable notationKey = null;
  
  @observable startTone = [0,0];
  constructor() {
    this.notation = null;
  }

  @action setIntervalY(interval) {
    this.intervalY = interval;
  }

  @action setIntervalX(interval) {
    this.intervalX = interval;
  }

  @action setWidth(width) {
    this.width = width;
  }

  @action setHeight(height) {
    this.height = height;
  }

  @action setStartTone(startTone) {
    console.log(startTone);
    this.startTone = startTone
  }

  @action setNotation(notationClass) {
    this.intervals = notationClass.intervals;
    this.basicTones = notationClass.basicTones;
    this.rootTones = notationClass.rootTones;
    this.octaves = notationClass.octaves;
    this.intervalX = Object.keys(this.intervals)[0];
    this.intervalY = Object.keys(this.intervals)[1];
    this.notationKey = notationClass.key;

    let startTone = notationClass.defaultStartTone;
    this.startTone = [startTone.basicTone, startTone.octave];
  }
  
  @computed get keyboardNotationIndex() {
    return notations.findIndex((notation) => {return notation.key === this.notationKey});
  }
};

export default KeyboardStore;
