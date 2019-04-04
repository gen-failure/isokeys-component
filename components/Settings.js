import React from 'react';

import {inject, observer} from 'mobx-react';

import Output from './Settings/Output';
import Keyboard from './Settings/Keyboard';

import {Layout, Button} from 'antd';

@inject('ui')
@inject('output')
@observer
class Settings extends React.Component {
  render() {
    return (
      <Layout>
        <Layout.Content>
          <Output />
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
