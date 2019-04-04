import Notation from '../notations/midi'
import AbstractTuning from './abstract'

class MidiTuning extends AbstractTuning {
  static getPitches(baseTone, frequency, decimals=3) {
  baseTone = baseTone || Notation.defaultTuningTone;
  frequency = frequency || Notation.defaultTuningFrequency;
   const pitches = {}
    Notation.all.forEach((tone) => {
      pitches[tone] = this.fixDecimals(frequency * Math.pow(2.0, (tone - baseTone.number)/12), decimals)
    });
    return pitches;
  }

  static get notation() {
    return Notation; 
  }

  static get key() {
    return 'midi';
  }
}

export default MidiTuning;
