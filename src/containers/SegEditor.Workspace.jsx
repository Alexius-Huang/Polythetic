import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setupWorkspace, addVertex, createPolygon } from '../actions/Segmentation.Actions';
import Snap from 'snapsvg';
import sampleImage from '../sample-img-2.jpg';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = { img: { width: NaN, height: NaN } };
  }

  onImageLoad = ({ target: { offsetWidth: width, offsetHeight: height } }) => {
    this.setState({ img: { width, height } }, function() {
      this.setupSVG();
    });
  }

  /* TODO: Should move the logic of setting up SVG to saga */
  setupSVG = () => {
    const { img: { width: imgWidth, height: imgHeight } } = this.state;
    const { svg, svgElement } = this;
    const { dispatch } = this.props;
    const { clientWidth: svgWidth, clientHeight: svgHeight } = svgElement;
    const imgTranslation = [(svgWidth - imgWidth) / 2, (svgHeight - imgHeight) / 2];

    const svgImg = svg.image(sampleImage, 0, 0, imgWidth, imgHeight);

    svgImg.transform(`translate(${imgTranslation})`);
    svgImg.addClass('seg-image');
    svgImg.click(this.handleImageClick);

    const polygonGroup = svg.g();
    polygonGroup.addClass('seg-polygon-group');
    polygonGroup.transform(`translate(${imgTranslation})`);

    dispatch(setupWorkspace({
      snapSvgObj: svg,
      snapImageObj: svgImg,
      snapPolygonGroupObj: polygonGroup
    }));
  }

  handleImageClick = (event) => {
    const { image, focused: { polygon }, dispatch } = this.props;
    if (image) {
      const { x: imgLeftBound, y: imgTopBound } = image.getBBox();
      const { offsetX: mouseX, offsetY: mouseY } = event;
      const [x, y] = [mouseX - imgLeftBound, mouseY - imgTopBound];

      if (polygon) {
        dispatch(addVertex(x, y));
      } else {
        dispatch(createPolygon(x, y));
      }
    }
  }

  render() {
    return (
      <section className="SegEditor-Workspace">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          ref={(c) => {
            this.svgElement = c;
            this.svg = Snap(c);
          }}
          width="100%"
          height="100%"
        />
        <img
          className="hidden-img"
          onLoad={this.onImageLoad}
          src={sampleImage}
          alt="loaded-img"
        />
      </section>
    );
  }
}

function mapStateToProps({ Segmentation: { tool, workspace } }) {
  const {
    svg,
    image,
    polygonGroup,
    focused
  } = workspace;

  return {
    tool,
    svg,
    image,
    polygonGroup,
    focused
  };
}

Workspace.propTypes = {
  tool: PropTypes.oneOf(['pencil', 'eraser']).isRequired,
  svg: PropTypes.object,
  image: PropTypes.object,
  polygonGroup: PropTypes.object,
  focused: PropTypes.shape({
    vertex: PropTypes.object,
    polygon: PropTypes.object
  }),
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(Workspace);
