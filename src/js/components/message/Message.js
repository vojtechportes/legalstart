import React, { Component } from "react";
import PropTypes from "prop-types";

class Message extends Component {
  render() {
    const props = this.props; 

    console.log(props);

    return(
      <div className={"alert alert-" + props.type} role={props.type} dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}>
        {props.message}
      </div>
    );
  }
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
};

export default Message;