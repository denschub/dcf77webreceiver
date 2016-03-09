import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

import Arc from "./svg_elements/arc";
import Marker from "./svg_elements/marker";

export default React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    height: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  getMarkerSeries: function(name, count, lengthCalc, color, stroke) {
    let markers = [], fraction = 180 / count;
    for (let i = 0; i <= count; i++) {
      markers.push(React.createElement(Marker, {
        color: color,
        length: lengthCalc(i),
        planeHeight: this.props.height,
        planeWidth: this.props.width,
        strokeWidth: stroke,
        rotation: i * fraction,
        key: `${name}-marker-${i}`
      }));
    }
    return markers;
  },

  getHourMarkers: function() {
    return this.getMarkerSeries(
      "hour",
      24,
      (i) => {
        return i % 2 == 0 ? 60 : 20;
      },
      "rgb(247, 236, 192)",
      2
    );
  },

  getMinuteMarkers: function() {
    return this.getMarkerSeries(
      "minute",
      60,
      () => {
        return 40;
      },
      "rgba(247, 236, 192, 0.5)",
      1
    );
  },

  render: function() {
    return React.DOM.svg(
      {
        height: this.props.height,
        viewBox: [0, 0, this.props.width, this.props.height].join(" "),
        width: this.props.width
      },
      React.createElement(Arc, {
        color: "rgb(247, 236, 192)",
        height: this.props.height,
        strokeWidth: 2,
        width: this.props.width
      }),
      this.getHourMarkers(),
      this.getMinuteMarkers()
    );
  }
});
