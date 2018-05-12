import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SegEditor from './containers/SegEditor';
import './App.sass';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/segmentation-editor" component={SegEditor} />
      </div>
    );
  }
}

export default App;
