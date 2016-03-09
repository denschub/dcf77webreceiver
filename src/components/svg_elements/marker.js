import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

export default React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    color: React.PropTypes.string.isRequired,
    length: React.PropTypes.number.isRequired,
    planeHeight: React.PropTypes.number.isRequired,
    planeWidth: React.PropTypes.number.isRequired,
    rotation: React.PropTypes.number.isRequired,
    strokeWidth: React.PropTypes.number.isRequired
  },

  render: function() {
    return React.DOM.path({
      d: [
        "M",
        0,
        this.props.planeHeight,
        "L",
        this.props.length,
        this.props.planeHeight
      ].join(" "),
      stroke: this.props.color,
      strokeWidth: this.props.strokeWidth,
      transform: "rotate(" + [
        this.props.rotation,
        this.props.planeHeight,
        this.props.planeWidth / 2
      ].join(" ") + ")"
    });
  }
});
