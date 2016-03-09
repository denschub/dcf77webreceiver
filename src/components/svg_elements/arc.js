import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

export default React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    color: React.PropTypes.string.isRequired,
    height: React.PropTypes.number.isRequired,
    strokeWidth: React.PropTypes.number.isRequired,
    width: React.PropTypes.number.isRequired
  },

  render: function() {
    return React.DOM.path({
      d: [
        "M",
        this.props.strokeWidth / 2,
        this.props.height,
        "A 1 1 0 0 1",
        this.props.width - this.props.strokeWidth / 2,
        this.props.height
      ].join(" "),
      fill: "none",
      stroke: this.props.color,
      strokeWidth: this.props.strokeWidth
    });
  }
});
