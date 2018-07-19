import React from "react";
import PropTypes from "prop-types";

const Feedback = ({ message }) => (
  <div className="invalid-feedback">
    {message}
  </div>
);

Feedback.propTypes = {
  message: PropTypes.string
};

export default Feedback;