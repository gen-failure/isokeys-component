import React from 'react';
import {inject, observer} from 'mobx-react';
import {computed} from 'mobx';

import notations from '../notations';

import './Keyboard.scss';

@inject('output')
@inject('keyboard')
@observer
class KeyboardTile extends React.Component {
  render() {
    return(
      <div className="toneButton" data-semitone={this.props.tone.isSemitone} data-tone={this.props.tone.number} style={{width: this.props.size, height: this.props.size}} data-x={this.props.x} data-y={this.props.y} data-active={this.props.output.activeNotes.indexOf(this.props.tone.number) !== -1} data-start-tone={this.props.startTone}>{this.props.tone.label}</div>
    )
  }
}


@inject('output')
@inject('keyboard')
@inject('ui')
@observer
class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.keyboardElement = React.createRef();
    this.handleTouch = (event) => {
      event.preventDefault();
      let notes = [];

      for (let i=0; i< event.touches.length;i++) {
        let touch = event.touches.item(i);
        if (touch) {
          //let force = touch.force || 1;
          let force = 1;
          let element = document.elementFromPoint(touch.clientX,touch.clientY);
          if (element && element.hasAttribute('data-tone')) notes.push([parseInt(element.getAttribute('data-tone')),Math.ceil(127*force), this.props.output.channel]);
        }
      }
      this.props.output.setNotes(notes);
    };

  }
  get grid() {
    let Tone = notations[this.props.keyboard.keyboardNotationIndex];
    let startTone = new Tone(...this.props.keyboard.startTone) //Fix me and add configuration option for this one;
    
    let hStep = Tone.intervals[this.props.keyboard.intervalX];
    let vStep = Tone.intervals[this.props.keyboard.intervalY];

    let middle_x = Math.round(this.props.keyboard.width/2)-1;
    let middle_y = Math.round(this.props.keyboard.height/2)-1;
    const keys=[];
    for (let iy=0;iy<this.props.keyboard.height;iy++) {
      let row = [];
      for (let ix=0;ix<this.props.keyboard.width;ix++) {
        row[ix] = startTone.increase(hStep, ix-middle_x).increase(vStep, middle_y-iy);
      }
      keys.push(row);
    }
    return keys;
  }

  @computed get keySize() {
    let keySize;
    if ((this.props.ui.width/this.props.keyboard.width) <= (this.props.ui.height/this.props.keyboard.height)) {
      keySize = this.props.ui.width/this.props.keyboard.width;
    } else {
      keySize = this.props.ui.height/this.props.keyboard.height;
    }
    return Math.floor(keySize);
  }

  componentDidMount() {
    this.keyboardElement.current.addEventListener('touchstart', this.handleTouch, {passive: false});
    this.keyboardElement.current.addEventListener('touchmove', this.handleTouch);
    this.keyboardElement.current.addEventListener('touchend', this.handleTouch);
  }
  render() {
    let keySize = this.keySize;
    let startTone = new notations[this.props.keyboard.keyboardNotationIndex](...this.props.keyboard.startTone);
    return (
      <div className="keyboardComponent">
        <div className="keyboardGrid" ref={this.keyboardElement}>
          {this.grid.map((row, y) => {
            return (
              <div className="row" key={`row-${y}`}>
                {row.map((tone, x) => {
                  return (
                    <KeyboardTile tone={tone} x={x} y={y} size={keySize} startTone={tone.number === startTone.number} />
                  ) 
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Keyboard;
