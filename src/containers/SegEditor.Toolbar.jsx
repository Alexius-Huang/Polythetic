import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTool } from '../actions/Segmentation.Actions';
import { zoomIn, zoomOut } from '../actions/Editor.Actions';

const Icon = ({ type }) => <span className={`fa fa-${type}`} />;

class Toolbar extends Component {
  changeToolTo = (toolName) => {
    return () => {
      this.props.dispatch(setTool(toolName));
    };
  }

  render() {
    const { tool, zoomRate, dispatch } = this.props;
    return (
      <section className="SegEditor-Toolbar">
        <div className="toolbar-wrapper">
          <div className="tool-section">
            <button onClick={this.changeToolTo('pencil')} className={tool === 'pencil' ? 'active' : ''}>
              <Icon type="pencil" />
            </button>
            <button onClick={this.changeToolTo('eraser')} className={tool === 'eraser' ? 'active' : ''}>
              <Icon type="eraser" />
            </button>
          </div>

          <div className="tool-section">
            <input disabled type="text" value={`${Math.floor(zoomRate * 100)}%`} />
            <button onClick={() => dispatch(zoomIn(0.1))}><Icon type="search-plus" /></button>
            <button onClick={() => dispatch(zoomOut(0.1))}><Icon type="search-minus" /></button>
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps({
  Segmentation: { tool },
  Editor: { zoomRate }
}) {
  return { tool, zoomRate };
}

Toolbar.propTypes = {
  tool: PropTypes.oneOf(['pencil', 'eraser']).isRequired,
  zoomRate: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Toolbar);
