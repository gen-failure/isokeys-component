import React from 'react';
import {inject, observer} from 'mobx-react';

import Settings from './Settings';
import Keyboard from './Keyboard';

@inject('ui')
@observer
class MainWindow extends React.Component {
  render() {
    return(
      <div style={{width:'100%',height:'100%'}} id="mainWindow">
        {this.props.ui.screen === 'settings' && <Settings /> }
        {this.props.ui.screen === 'keyboard' && <Keyboard /> }
      </div>
    );
  }
}

export default MainWindow;
