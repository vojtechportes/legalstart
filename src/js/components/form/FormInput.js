import React, { Component } from "react";
import PropTypes from "prop-types";
import Feedback from "./FormFeedback";

class Input extends Component {
  render() {
    const props = this.props;
    let message;
    let validity;

    console.log(props);

    if (props.showMessage) {
      message = <Feedback message={props.message} />
      validity = 'is-invalid'
    } else {
      message = '';

      console.log(props);

      if (!props.isInitial) {
        validity = 'is-valid';
      }
    }

    return(
      <div className="form-group">
        <label htmlFor={props.label}>{props.text}</label>
        <input
          type={props.type}
          className={"form-control " + validity}
          id={props.id}
          value={props.value}
          onChange={props.handleChange}
        />
        {message}
      </div>
    );
  }
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  showMessage: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  isInitial: PropTypes.bool
};

export default Input;