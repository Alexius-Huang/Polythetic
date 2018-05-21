import React, { Component } from 'react';
import sampleImage from '../sample-img-2.jpg';
import Snap from 'snapsvg';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = { img: { width: NaN, height: NaN } };
    this.setupSVG = this.setupSVG.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  onImageLoad({ target: { offsetWidth: width, offsetHeight: height } }) {
    this.setState({ img: { width, height } }, function() {
      this.setupSVG();
    });
  }

  setupSVG() {
    const { img: { width: imgWidth, height: imgHeight } } = this.state;
    const { svg, svgElement } = this;
    const { clientWidth: svgWidth, clientHeight: svgHeight } = svgElement;
    const imageOffset = [
      (svgWidth - imgWidth) / 2,
      (svgHeight - imgHeight) / 2
    ];

    const svgImg = svg.image(sampleImage, ...imageOffset, imgWidth, imgHeight);
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

export default Workspace;
