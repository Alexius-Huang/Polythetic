import React, { Component } from 'react';
import Toolbar from './SegEditor.Toolbar';
import Workspace from './SegEditor.Workspace';
import './SegEditor.sass';

class SegEditor extends Component {
  render() {
    return (
      <section className="SegEditor">
        <Toolbar />
        <Workspace />
      </section>
    );
  }
}

export default SegEditor;
