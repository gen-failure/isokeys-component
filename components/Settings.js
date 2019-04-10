import React from 'react';

import {inject, observer} from 'mobx-react';

import Output from './Settings/Output';
import Keyboard from './Settings/Keyboard';
import Tone from './Settings/Tone';

import outputs from '../outputs';

import {Layout, Button} from 'antd';

const toneIndex = outputs.findIndex((output) => {return output.key === 'tonejs'});

@inject('ui')
@inject('output')
@observer
class Settings extends React.Component {
  render() {
    return (
      <Layout>
        <Layout.Content>
          <Output />
          {(this.props.output.outputIndex === toneIndex) && <Tone />}
          <Keyboard />
        </Layout.Content>
        <Layout.Footer>
          <Button type="primary" size="large" onClick={() => {this.props.ui.showKeyboard()}}>Show keyboard</Button>
          {this.props.output.tuningEdited &&<Button type="secondary" size="large" onClick={() => {this.props.output.saveTuning()}}>SaveTuning</Button> }
        </Layout.Footer>
      </Layout>
    )
  }
}

export default Settings;
