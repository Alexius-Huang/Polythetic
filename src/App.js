import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import SegEditor from './containers/SegEditor';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/segmentation-editor" component={} />
      </div>
    );
  }
}

export default App;
