import React from 'react';
import {inject, observer} from 'mobx-react';

import {Row, Col, Layout, InputNumber, Form} from 'antd'

import Select from '../ui/Select';
import ToneSelect from '../ui/ToneSelect';

@inject('keyboard')
@inject('output')
@observer
class Keyboard extends React.Component {

  render() {
    return(
       <Layout>
        <Layout.Content style={{padding:'1em', margin: '1em'}}>
          <Row>
            <Col>
              <h2>Keyboard</h2>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item label="Width:">
                <InputNumber min={2} max={32} value={this.props.keyboard.width} onChange={(value) => {this.props.keyboard.setWidth(value)}} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Height:">
                <InputNumber min={2} max={32} value={this.props.keyboard.height} onChange={(value) => {this.props.keyboard.setHeight(value)}} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Select
                label="Horizontal interval"
                value={this.props.keyboard.intervalX}
                onChange={(item) => {this.props.keyboard.setIntervalX(item)}}
                data={Object.keys(this.props.keyboard.intervals).map((interval) => {return {value: interval, label: interval}})}
              />
            </Col>
            <Col span={6}>
              <Select
                label="Vertical interval"
                value={this.props.keyboard.intervalY}
                onChange={(item) => {this.props.keyboard.setIntervalY(item)}}
                data={Object.keys(this.props.keyboard.intervals).map((interval) => {return {value: interval, label: interval}})}
              />
            </Col>
            <Col span={6}>
              <ToneSelect 
                label="Start
                tone" value={this.props.keyboard.startTone}
                onChange={(value) => {this.props.keyboard.setStartTone(value)}}
                notationIndex={this.props.keyboard.keyboardNotationIndex}
              />
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    )
  }
}

export default Keyboard;
