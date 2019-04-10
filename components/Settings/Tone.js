import React from 'react';
import {inject, observer} from 'mobx-react';
import {Row, Col, Layout, Slider, Form} from 'antd'

import {toJS} from 'mobx';

@inject('output')
@observer
class Tone extends React.Component {
  render() {
    console.log(toJS(this.props.output.outputOptions));
    return (
        <Layout>
          <Layout.Content style={{padding:'1em', margin: '1em'}}>
            <Row>
              <Col>
                <h2>Tone.JS settings</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>ADSR Envelope</h3>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Form.Item label="Attack:">
                  <Slider min={0} max={4} step={0.001} value={this.props.output.outputOptions.attack} onChange={(value) => {this.props.output.setOutputOption('attack', value)}} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Decay:">
                  <Slider min={0} max={8} step={0.01} value={this.props.output.outputOptions.decay} onChange={(value) => {this.props.output.setOutputOption('decay', value)}} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Sustain:">
                  <Slider min={0} max={8} step={0.01} value={this.props.output.outputOptions.sustain} onChange={(value) => {this.props.output.setOutputOption('sustain', value)}} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Release:">
                  <Slider min={0} max={8} step={0.01} value={this.props.output.outputOptions.release} onChange={(value) => {this.props.output.setOutputOption('release', value)}} />
                </Form.Item>
              </Col>
            </Row>
          </Layout.Content>
        </Layout>
     
    )
  }
}

export default Tone;
