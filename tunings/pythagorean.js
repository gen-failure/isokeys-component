import Notation from '../notations/base40';
import AbstractTuning from './abstract';

export default class extends AbstractTuning {
  static getPitches(baseTone,frequency, decimals=3) {
    baseTone = baseTone || Notation.defaultTuningTone();
    frequency = frequency || Notation.defaultTuningFrequency();
    const pitches = {};
    Notation.all.forEach((tone) => {
      pitches[tone.number] = null;
    });

    const intervalSteps = {
      'M2': (9/8),
      'P4': (4/3),
      'P5':  (3/2)
    }

    pitches[baseTone.number] = this.fixDecimals(frequency, decimals);

    let calculated = [];
    let finished = false;
    do {
      let ci = 0;
      Object.keys(pitches).forEach((tone) => {
        tone = parseInt(tone);
        if (pitches[tone] !== null && calculated.indexOf(tone) === -1) {
          const pitch = pitches[tone];

          const toneObject = new Notation(tone);

          ['M2', 'P4','P5'].forEach((interval) => {
            const higherTone = toneObject.increase(Notation.intervals[interval]);
            const lowerTone = toneObject.decrease(Notation.intervals[interval]);

            if (higherTone.isValid && (pitches[higherTone.number] === null)) {
              pitches[higherTone.number] = this.fixDecimals(pitch*intervalSteps[interval], decimals)
            }
            
            if (lowerTone.isValid && (pitches[lowerTone.number] === null)) {
              pitches[lowerTone.number] = this.fixDecimals(pitch/intervalSteps[interval], decimals);
            }
          });

          calculated.push(tone);
          ci++;
        }
      });
      if (ci === 0) finished = true;
    }
    while (!finished);
    return pitches;
  }

  static get notation() {
    return Notation;
  }

  static get key() {
    return 'pythagorean';
  }
}
