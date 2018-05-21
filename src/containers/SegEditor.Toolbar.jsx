import React, { Component } from 'react';

const Icon = ({ type }) => <span className={`fa fa-${type}`} />;

class Toolbar extends Component {
  render() {
    return (
      <section className="SegEditor-Toolbar">
        <div className="tool-section">
          <button><Icon type="pencil" /></button>
          <button><Icon type="eraser" /></button>
        </div>

        <div className="tool-section">
          <button><Icon type="search-plus" /></button>
          <button><Icon type="search-minus" /></button>
        </div>
      </section>
    );
  }
}

export default Toolbar;
