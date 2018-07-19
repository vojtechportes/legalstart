import React, { Component } from "react";
import PropTypes from "prop-types";
import Option from "./FormSelectOption";
import Feedback from "./FormFeedback";

class Select extends Component {
  render() {
    const props = this.props;
    let message;
    let options = [];
    let selected = '';
    let validity = '';

    if (props.showMessage) {
      message = <Feedback message={props.message} />
      validity = 'is-invalid'
    } else {
      message = '';
      validity = 'is-valid';
    }

    Object.keys(props.options).forEach((key, i) => {
      options.push(<Option value={key} text={props.options[key].value} />);
    });

    return(
      <div className="form-group">
        <label htmlFor={props.label}>{props.text}</label>
        <select
          type={props.type}
          className={"form-control " + validity}
          id={props.id}
          value={props.value}
          onChange={props.handleChange}
        >
          {options}
        </select>
        {message}
      </div>
    );
  }
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  showMessage: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  isInitial: PropTypes.bool
};

export default Select;