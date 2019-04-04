import React from 'react';
import outputs from '../../outputs';
import {inject, observer} from 'mobx-react';

import {Col, Form, Row, Layout} from 'antd';
import Select from '../ui/Select';
import ToneSelect from '../ui/ToneSelect';
import NumberInput from '../ui/NumberInput';

import tunings from '../../tunings';

@inject('output')
@observer
class Output extends React.Component {

  get selectOutputButtonLabel() {
    try {
      return outputs[this.props.output.outputIndex].name
    } catch(e) {
      return 'Select output'
    }
  }

  //to handle string vs integer issues
  get selectedOutputIndex() { return String(this.props.output.outputIndex)}
  get selectedChannelIndex() {return String(this.props.output.channel)}
  render() {
    return(
      <Layout>
        <Layout.Content style={{padding:'1em', margin: '1em'}}>
          <Row>
            <Col>
              <h2>Output</h2>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <Select
                label="Output type"
                value={this.props.output.outputIndex} 
                onChange={(item) => {this.props.output.initOutput(item)}}
                data={outputs.map((output, index) => {return {value: index, label: output.name, key: output.key}})}
              />
            </Col>
            <Col span={4}>
              <Select
                label="Channel"
                value={this.props.output.channel}
                onChange={(item) => {this.props.output.setChannel(item)}}
                data={this.props.output.channels}
              />
            </Col>
            {this.props.output.supportsOutputs &&
              <Col span={4}>
                <Select
                  label="Midi Output"
                  value={this.props.output.outputOptions.output}
                  onChange={((item) => {this.props.output.setOutputOption('output', item)})}
                  data={this.props.output.outputOptions.outputs}
                />
              </Col>
            }
            {this.props.output.supportsTuning &&
              <Col span={4}>
                <Select
                  label="Select tuning"
                  value={this.props.output.tuningIndex}
                  onChange={((item) => {this.props.output.setTuningIndex(item)})}
                  data={tunings.map((tuning, index) => {return {label: tuning.key, value: index}})}
                />
              </Col>
            }
            {this.props.output.supportsTuning &&
              <Col span={4}>
                <ToneSelect
                  label="Tuning tone"
                  value={this.props.output.tuningTone}
                  notationIndex={this.props.output.tuningNotationIndex}
                  onChange={((item) => {this.props.output.setTuningTone(item)})}
                />
              </Col>
            }
            {this.props.output.supportsTuning &&
              <Col span={4}>
                <NumberInput
                  label="Tuning frequency"
                  value={this.props.output.tuningFrequency}
                  onChange={((value) => {this.props.output.setTuningFrequency(value)})}
                />
              </Col>
            }
          </Row>
        </Layout.Content>
      </Layout>
    );
  }
}

export default Output;
