import React from 'react';
import {Form, Cascader} from 'antd';
import notations from '../../notations';

class ToneSelect extends React.Component {

  get options() {
    let Notation = notations[this.props.notationIndex];
    let options = [];
    Object.keys(Notation.basicTones).forEach((tone) => {
      let toneOctaves = {
        value: Number(tone),
        label: Notation.basicTones[tone],
        children: []
      }
      Notation.octaves.forEach((octave) => {
        toneOctaves.children.push({
          value: octave,
          label: octave 
        })
      })
      options.push(toneOctaves);
    });
    return options;
  }

  render() {
    return (
      <Form.Item label={this.props.label}>
        <Cascader
          value={this.props.value}
          onChange={this.props.onChange}
          options={this.options}
          allowClear={false}
          displayRender={(label) => {
            console.log(label);
            return `${label[0]}${label[1]}`
          }}
        />
      </Form.Item>
    )
  }
}

export default ToneSelect;
