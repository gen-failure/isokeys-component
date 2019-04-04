import React from 'react';
import './App.scss';
import 'antd/dist/antd.css';

import KeyboardStore from './stores/keyboard';
import OutputStore from './stores/output';
import UIStore from './stores/ui';
import {Provider} from 'mobx-react';

import MainWindow from './components/MainWindow';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.stores = {
      keyboard: new KeyboardStore(),
      output: new OutputStore(),
      ui: new UIStore()
    }

    window.stores = this.stores;

    Object.keys(this.stores).forEach((store) => {
      this.stores[store].stores = this.stores;
    });

    this.stores.output.initialize();
    console.log(this.stores);
  }
  render() {
    return (
      <Provider {...this.stores}>
        <MainWindow />
      </Provider>
    );
  }
}

export default App;
