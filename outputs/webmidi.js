import AbstractOutput from './abstract';
import MidiNotation from '../notations/midi';

export default class WebMIDIOutput extends AbstractOutput {
  async initialize() {
    try {
      this.setNotation(this.notation);
      this.midi = await navigator.requestMIDIAccess();
      this.setOption('outputs', this._outputs);
      if (this.options.outputs.length > 0) {
        this.setOption('output', this.options.outputs[0].value);
      } else {
        console.log(this.options);
        throw new Error('no valid output');
      }
      this.setChannels(this.channels);
      this.onReady(this.options); 
       
    } catch(error) {
      console.log(error);
      this.onFail(error)
    }
  }

  noteOn(number, velocity=127, channel=0) {
    console.log('note on channel', channel);
    this.sendMessage((0x90+channel), number, velocity)
  }
  
  noteOff(number, channel=0) {
    this.sendMessage((0x80+channel), number, 0);
  }
  
  sendMessage(b1,b2,b3) {
    this.output.send([b1,b2,b3]);
  }

  unload() {
    return true
  }

  optionChanged(key,value) {
    super.optionChanged(key,value);
    switch(key) {
      case 'output':
        this.output = this.midi.outputs.get(value);
        break;
      default:
        break;
    }
  }

  get notation() {
    return MidiNotation;
  }

  get channels() {
    let channels = [];

    for (let i=0;i<16;i++) {
      channels.push({value: i, label: `MIDI Channel ${i}`});
    }

    return channels;
  }

  get _outputs() {
    console.log(this.midi.outputs);
    let outputs = [];
    this.midi.outputs.forEach((output) => {
      outputs.push({label: output.name, value: output.id});
    });
    console.log(outputs)
    return outputs;
  }

  get _defaultOptions() {
    return {
        outputs: [],
        output: null
      };
  }

  static get available() {
    return Boolean(navigator.requestMIDIAccess);
  }

  static get supportsOutputs() {
    return true;
  }

  static get key() {
    return 'webmidi'
  }
  
  static get label() {
    return 'WebMidi'
  }
}
