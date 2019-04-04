import {action, computed, observable, runInAction} from 'mobx';

import outputs from '../outputs';
import tunings from '../tunings';
import notations from '../notations';

export default class OutputStore {
  @observable outputReady = false;
  @observable outputIndex = null;
  @observable outputErrorMsg = null;
  @observable channels = [];
  @observable outputOptions = {};
  @observable channel=0;
  @observable activeNotes=[];
  @observable supportsOutputs=false;
  @observable supportsTuning=false;
  @observable tuningIndex=0;
  @observable tuningTone;
  @observable tuningFrequency
  @observable tuningEdited = false;

   constructor() {
    this.output = null;
  }

  initialize() {
    this.setTuningIndex(0);
    this.initOutput(0);
  }

  @action async initOutput(outputIndex) {
    this.supportsOutputs = false;
    this.supportsTuning = false;
    this.outputReady = false;
    const params = {
      onReady: (options) => {
        runInAction(() => {
          console.log(options);
          this.outputOptions = options;
          this.outputReady=true
        });
      },
      onFail: (errorMsg) => {
        alert(errorMsg);
        runInAction(() => {
          this.outputReady=false;
          this.outputErrorMsg=errorMsg
        });
      },
      setNotation: (notation) => { 
        this.stores.keyboard.setNotation(notation)
      },
      setChannels: (channels) => { runInAction(() => {this.channels = channels})},
      setOption: (key, value) => { 
        this.setOutputOption(key, value)
      },
      setActiveNotes: (notes) => {
        runInAction(() => {
          console.log(notes);
          this.activeNotes = notes;
        })
      }
    }
    const OutputClass = outputs[outputIndex];
    if (OutputClass.supportsTuning) {
      this.supportsTuning = true;
      params.pitches = this.pitches;
    }

    this.output = new OutputClass(params);
    this.outputIndex = outputIndex;
    await this.output.initialize();
    this.supportsOutputs = OutputClass.supportsOutputs;
  }

   @action setOutputOption(key, value) {
    this.outputOptions[key] = value;
    this.output.optionChanged(key,value);
   }

  @action setChannel(channel) {
    this.channel = channel;
  }
  @action setNotes(notes) {
    this.output.setNotes(notes);
  }

  @action setTuningIndex(tuningIndex) {
    let TuningClass = tunings[tuningIndex]; 
    let tone = TuningClass.notation.defaultTuningTone;
    this.tuningTone = [tone.basicTone, tone.octave];
    this.tuningFrequency = TuningClass.notation.defaultTuningFrequency;
    //Do not set edited flag during initialize
    if (this.tuningIndex !== tuningIndex) {
      this.tuningEdited=true; 
    } else {
      this.stores.keyboard.setNotation(TuningClass.notation);
    }
    this.tuningIndex = tuningIndex;
  }

  @action setTuningTone(tone) {
    this.tuningTone = tone;
    this.tuningEdited=true;
  }

  @action setTuningFrequency(frequency) {
    this.tuningFrequency = frequency;
    this.tuningEdited=true;
  }

  //Called from component so it's an action, even if it does not modify state directly
  @action saveTuning() {
    this.output.pitches=this.pitches;
    this.stores.keyboard.setNotation(tunings[this.tuningIndex].notation);
    this.tuningEdited=false;
  }

  get pitches() {
    let Tuning = tunings[this.tuningIndex]
    return Tuning.getPitches(new Tuning.notation(...this.tuningTone), this.tuningFrequency);
  }

  @computed get tuningNotationIndex() {
    return notations.findIndex((notation) => {return notation.key === tunings[this.tuningIndex].notation.key});
  }
}
