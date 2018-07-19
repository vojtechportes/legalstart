import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../FormInput";
import Select from "../FormSelect";
import Message from "../../message/Message";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: {
        value: "mr",
        isValid: false,
        isInitial: true,
        showMessage: false,
        message: '',
        validation: {
          type: "string",
          emptyMessage: "Please select your title",
          invalidMessage: "This field contains invalid characters",
          isRequired: true
        }
      },
      name: {
        value: "",
        isValid: false,
        isInitial: true,
        showMessage: false,
        message: '',
        validation: {
          type: "string",
          emptyMessage: "Please fill in your name",
          invalidMessage: "This field contains invalid characters",
          isRequired: true          
        }
      },
      surname: {
        value: "",
        isValid: false,
        isInitial: true,
        showMessage: false,
        message: '',
        validation: {
          type: "string",
          emptyMessage: "Please fill in your surname",
          invalidMessage: "This field contains invalid characters",
          isRequired: true          
        }
      },
      email: {
        value: "",
        isValid: false,
        isInitial: true,
        showMessage: false,
        message: '',
        validation: {
          type: "email",
          emptyMessage: "Please fill in your email",
          invalidMessage: "Please fill in valid email address",
          isRequired: true   
        }
      },  
      nationality: {
        value: "fr-fr",
        isValid: false,
        isInitial: true,
        showMessage: false,
        message: '',
        validation: {
          type: "string",
          conditionalValidation: {
            'fr-fr': {pattern: '^([CFGHJKLMNPRTVWXYZ0-9]{9})$', invalidMessage: 'Passport ID needs to contain letters CFGHJKLMNPRTVWXYZ and digits 0-9 with 9 characters in total', validationTarget: 'passportId'},
            'pt-br': {pattern: '^([CFGHJKLMNPRTVWXYZ]{2}[0-9]{6})$', invalidMessage: 'Passport ID needs to contain two letters CFGHJKLMNPRTVWXYZ followed by six digits 0-9', validationTarget: 'passportId'}
          },
          emptyMessage: "Please select your nationality",
          invalidMessage: "Please fill in valid nationality",
          isRequired: true   
        }
      }, 
      passportId: {
        value: "",
        isValid: false,
        isInitial: true,
        showMessage: false,
        message: '',
        validation: {
          type: "pattern",
          pattern: '^([CFGHJKLMNPRTVWXYZ0-9]{9})$',
          emptyMessage: "Please fill in your passport ID",
          invalidMessage: "Passport ID needs to contain letters CFGHJKLMNPRTVWXYZ and digits 0-9 with 9 characters in total",
          isRequired: true  
        }
      },                    
      canSubmit: false      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setValidationData(value, event) {
    const targetId = event.target.id;
    const targetValue = value;
    const conditionalValidation = this.state[targetId].validation.conditionalValidation;

    if (typeof conditionalValidation !== 'undefined') {
      console.log(conditionalValidation[value]);

      this.setState(prevState => ({
        [conditionalValidation[value].validationTarget]: {
          ...prevState[conditionalValidation[value].validationTarget],
          validation: {
            ...prevState[conditionalValidation[value].validationTarget].validation,
            pattern: conditionalValidation[value].pattern,
            invalidMessage: conditionalValidation[value].invalidMessage
          }
        }     
      }), () => {
        console.log(this.state);
        this.validate(this.state[conditionalValidation[value].validationTarget].value, {target: {id: conditionalValidation[value].validationTarget}});
      }); 
    }
  }

  setValue(value, event) {
    const targetId = event.target.id;
    const targetValue = value;

    this.setState(prevState => ({
      [targetId]: {
        ...prevState[targetId],
        value: targetValue
      }
    }));    
  }

  setInitialValue(event) {
    const targetId = event.target.id;

    this.setState(prevState => ({
      [targetId]: {
        ...prevState[targetId],
        isInitial: false
      }
    }), () => {
      console.log(this.state[targetId]);
    });   
  }

  getFormatedValues() {
    let values = ["<ul>"];

    Object.keys(this.state).forEach(key => {
      if (key !== 'canSubmit') {
        values.push("<li><strong>" + key + ":</strong> " + this.state[key].value + "</li>");
      }
    });

    values.push("</ul>");

    return values.join('');
  }
 
  validate(value, event) {
    /*
    data.pattern
    data.required
    data.type (int|string|regex)
    */

    const targetId = event.target.id;
    const validation = this.state[targetId].validation;
    const targetValue = value;
    let re;

    const setState = (targetId, showMessage = false, messageText = '') => {
      this.setState(prevState => ({
        [targetId]: {
          ...prevState[targetId],
          showMessage: showMessage,
          message: messageText,
          value: targetValue
        }
      }));
    
      return !showMessage;
    };

    if (targetValue.length > 0) {
      switch (validation.type) {
        case 'string':
          if (typeof targetValue !== "string") {
            return setState(targetId, true, validation.invalidMessage);
          } else {
            return setState(targetId, false);
          }      
          break;
        case 'int':
          if (isNaN(targetValue)) {
            return setState(targetId, true, validation.invalidMessage);
          } else {
            return setState(targetId, false);
          }
          break;
        case 'email':
          re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
          if (!re.test(String(targetValue).toLowerCase())) {
            return setState(targetId, true, validation.invalidMessage);
          } else {
            return setState(targetId, false);
          }
          break;
        case 'pattern':
          re = new RegExp(validation.pattern);

          if (!re.test(targetValue)) {
            return setState(targetId, true, validation.invalidMessage);
          } else {
            return setState(targetId, false);
          }
          break;
      }
    } else {
      if (validation.isRequired) {
        return setState(targetId, true, validation.emptyMessage);
      } else {
        return setState(targetId, false);     
      }
    }
  }

  handleChange(event) {
    const targetValue = event.target.value;

    this.setInitialValue(event);
    this.setValue(targetValue, event);
    this.setValidationData(targetValue, event);
    this.validate(targetValue, event);
  }

  handleSubmit(event) {
    event.preventDefault();

    const state = this.state;
    let canSubmit = [];

    Object.keys(state).forEach((key) => {
      if (typeof state[key].validation !== 'undefined') {
        canSubmit.push(this.validate(this.state[key].value, {target: {id: key}}));
      }
    });

    if (canSubmit.indexOf(false) === -1) {
      this.setState({canSubmit: true});
      console.log('canSubmit');
    }
  }

  render() {
    if (this.state.canSubmit) { 
      const values = this.getFormatedValues();

      return (
        <div>
          <Message type="success" dangerouslySetInnerHTML={{__html: '<h4 class="alert-heading">Form was successfully sumitted with following values:</h4><hr>' + values}} />
        </div>
      )
    } else {
    return (
      <div className="row">
        <div className="col-md-7">
          <form id="registration-form" onSubmit={this.handleSubmit}>
            <Select
              text="Title"
              label="title"
              id="title"
              options={{
                'mr': {value: 'Mr'},
                'mrs': {value: 'Mrs'}
              }}
              value={this.state.title.value}
              handleChange={this.handleChange}
              showMessage={this.state.title.showMessage}
              message={this.state.title.message}
              isInitial={this.state.title.isInitial}
            />   

            <Input
              text="Name"
              label="name"
              type="text"
              id="name"
              value={this.state.name.value}
              handleChange={this.handleChange}
              showMessage={this.state.name.showMessage}
              message={this.state.name.message}
              isInitial={this.state.name.isInitial}
            />   

            <Input
              text="Surname"
              label="surname"
              type="text"
              id="surname"
              value={this.state.surname.value}
              handleChange={this.handleChange}
              showMessage={this.state.surname.showMessage}
              message={this.state.surname.message}
              isInitial={this.state.surname.isInitial}
            />       

            <Input
              text="Email"
              label="email"
              type="text"
              id="email"
              value={this.state.email.value}
              handleChange={this.handleChange}
              showMessage={this.state.email.showMessage}
              message={this.state.email.message}
              isInitial={this.state.email.isInitial}
            />    

            <Select
              text="Nationality"
              label="nationality"
              id="nationality"
              options={{
                'fr-fr': {value: 'French'},
                'pt-br': {value: 'Brasilian'}
              }}
              value={this.state.nationality.value}
              handleChange={this.handleChange}
              showMessage={this.state.nationality.showMessage}
              message={this.state.nationality.message}
              isInitial={this.state.nationality.isInitial}
            />               

            <Input
              text="Passport ID"
              label="passportId"
              type="text"
              id="passportId"
              value={this.state.passportId.value}
              handleChange={this.handleChange}
              showMessage={this.state.passportId.showMessage}
              message={this.state.passportId.message}
              isInitial={this.state.passportId.isInitial}
            />                       

            <input type="submit" value="Submit" className="btn btn-primary" />                    
          </form>
        </div>
        <div className="col-md-5">
          <div className="alert alert-info">
            <h2><small>Where to find your passport ID</small></h2>
            <hr />
            <p>You can find your passport ID on the first page of your passport.</p>
            <p>French passport ID needs to contain letters CFGHJKLMNPRTVWXYZ and digits 0-9 with 9 characters in total.</p>
            <p>Passport ID needs to contain two letters CFGHJKLMNPRTVWXYZ followed by six digits 0-9.</p>
          </div>
        </div>
      </div>
    );
    }
  }
};

export default FormContainer;

const wrapper = document.getElementById("load-registration-form");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;