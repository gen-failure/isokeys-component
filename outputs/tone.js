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
      this.options = {...this._defaulOptions};
      this.synth = new ToneJS.PolySynth(this.options.polyphony, ToneJS.FMSynth).toMaster();
      this._updateSynthOptions();
      this.setChannels(this.channels);
      this.onReady(this.options); 
    } catch(error) {
      console.log(error);
      this.onFail(error)
    }
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
        delay: this.options.delay,
        sustain: this.options.sustain,
        release: this.options.release
      },
      oscillator: {
        type: this.options.oscillator
      },
      modulator: {
        type: this.options.modulatorType
      },modulationEnvelope  : {
        attack  : this.options.modulationAttack,
        decay  : this.options.modulationDecay ,
        sustain  : this.options.modulationSustain ,
        release  : this.options.modulationRelease
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
      modulatorType: 'square',
      modulationAttack: 0.5,
      modulationDecay: 0,
      modulationRelease: 0.5
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
