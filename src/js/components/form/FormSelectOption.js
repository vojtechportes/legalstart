import React, { Component } from "react";
import PropTypes from "prop-types";

class Option extends Component {
  render() {
    const props = this.props;

    return(
      <option value={props.value}>{props.text}</option>
    );
  }
};

Option.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Option;