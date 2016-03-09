import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";

import Clockface from "./clockface";

import "../assets/css/main.scss";

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function() {
    return React.createElement(Clockface, {
      height: 500,
      width: 1000
    });
  }
});
