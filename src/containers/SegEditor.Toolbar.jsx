import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTool } from '../actions/Segmentation.Actions';

const Icon = ({ type }) => <span className={`fa fa-${type}`} />;

class Toolbar extends Component {
  changeToolTo = (toolName) => {
    return () => {
      this.props.dispatch(setTool(toolName));
    };
  }

  render() {
    const { tool } = this.props;
    return (
      <section className="SegEditor-Toolbar">
        <div className="tool-section">
          <button onClick={this.changeToolTo('pencil')} className={tool == 'pencil' ? 'active' : ''}>
            <Icon type="pencil" />
          </button>
          <button onClick={this.changeToolTo('eraser')} className={tool == 'eraser' ? 'active' : ''}>
            <Icon type="eraser" />
          </button>
        </div>

        <div className="tool-section">
          <button><Icon type="search-plus" /></button>
          <button><Icon type="search-minus" /></button>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ Segmentation: { tool } }) {
  return { tool };
}

Toolbar.propTypes = {
  tool: PropTypes.oneOf(['pencil', 'eraser']).isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Toolbar);
