export default class {
  constructor(params) {
    this.onFail = params.onFail;
    this.onReady = params.onReady;
    this.setOptions = params.setOptions;
    this.setOption = params.setOption;
    this.setNotation = params.setNotation;
    this.setChannels = params.setChannels;
    this.setActiveNotes = params.setActiveNotes;
    this.activeNotes = {};
    this.options = {}
  }

  async initialize() {
    try {
      this.options = this._defaultOptions;
      this.onReady(this.options); 
      this.setChannels(this.channels);
    } catch(error) {
      this.onFail(error)
    }
  }

  setNotes(notes) {
    let activeNotes = {};
  
    notes.forEach((note) => {
      let noteKey = note.shift()
      let velocity = note.shift();
      if (this.activeNotes.hasOwnProperty(noteKey)) {
        if (velocity !== this.activeNotes[noteKey]) this.aftertouch(noteKey, velocity, ...note) //aftertouch
      } else {
        this.noteOn(noteKey, velocity, ...note)
      }
      activeNotes[noteKey] = velocity;
    });

    Object.keys(this.activeNotes).forEach((note) => {
      if (!activeNotes.hasOwnProperty(note)) this.noteOff(note); //note off
    });
    this.activeNotes = activeNotes;
    this.setActiveNotes(Object.keys(activeNotes).map((note) => {return Number(note)}));
  }

  /**
   * @abstract
  */
  noteOn(number, velocity) {}
  teOn
  

  /**
   * @abstract
  */
  noteOff(number) {}

  /**
   * @abstract
  */
  aftertouch(note, velocity) {}

  optionChanged(key,value) {
    this.options[key] = value
    return true;
  }
  
  /**
   * @abstract
   * @return {object}
   */
  get _defaultOptions() {
    return {}
  }
  
  /**
   * @abstract
   * @return {Boolean}
   */

  unload() {
    return true
  }

  /**
   * @abstract
   * @return {Object}
   */
  get notation() {
    return null;
  }

  /**
   *  @abstract
   *  @return {Array}
   */
  get channels() {
    return [
      {value: 0, label: 'Default channel'}
    ];
  }

  /**
   *  @abstract
   *  @return {Boolean}
   */
  static get available() {
    return false;
  }

  static get supportsTuning() {
    return false; 
  }

  static get supportsOutputs() {
    return false;
  }

  /*
   *  @abstract
   *  @return {Array}
   */
  static get notations() {
    return [];
  }
}
