import ToneJS from 'tone';
import AbstractOutput from './abstract';

export default class ToneJSOutput extends AbstractOutput {
  constructor(params) {
    console.log(params)
    super(params);
    this.pitches = params.pitches;
  }

  async initialize() {
    try {
      this.options = this._defaultOptions;
      this.synth = new ToneJS.PolySynth().toMaster();
      //this._updateSynthOptions();
      this.onReady(this.options); 
      this.setChannels(this.channels);
    } catch(error) {
      console.log(error);
      this.onFail(error)
    }
    super.initialize();
  }

  noteOn(note,velocity) {
    this.synth.triggerAttack(this.pitches[note], undefined, 1); //noteon
  }

  noteOff(note, velocity) {
  this.synth.triggerRelease(this.pitches[note]); 
  }

//FIXME: Aftertouch not implemented... yet!

  optionChanged(key,value) {
    super.optionChanged(key,value);
    const synthOptions = ['oscillator', 'attack', 'decay', 'sustain', 'release'];
    if (synthOptions.indexOf(key) !== -1) {
      this._updateSynthOptions();
    }
  }

  _updateSynthOptions() {
    this.synth.set({
      envelope: {
        attack: this.options.attack,
        sustain: this.options.sustain,
        delay: this.options.delay,
        release: this.options.release
      },
      oscillator: {
        type: this.options.oscillator
      }
    }); 
  }

  get _defaulOptions() {
    return {
      polyphony: 4,
      oscillator: 'triangle',
      attack: 0.005,
      decay: 0.1,
      sustain: 0.3,
      release: 1,
    }
  }

  static available() {
    return Boolean(window.AudioContext);
  }

  static get supportsTuning() {
    return true
  }
  
  static get key() {
    return 'tonejs'
  }
  
  static get label() {
    return 'ToneJS'
  }
}
