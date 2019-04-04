import WebMidiOutput from './outputs/webmidi';
import ToneJSOutput from './outputs/tone';

const outputs = [];

if (WebMidiOutput.available) outputs.push(WebMidiOutput); 
if (ToneJSOutput.available) outputs.push(ToneJSOutput);

export default outputs;
