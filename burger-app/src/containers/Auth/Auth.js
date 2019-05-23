import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import './Auth.css'
import * as actions from '../../store/actions/index'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 8
        },
        valid: false,
        touched: false
      }
    },
    isSignup: false
  }

  // checkValidity(value, rules) {
    // let isValid = true;
    // if (!rules) {
    //   return true;
    // }

    // if (rules.required) {
    //   isValid = value.trim() !== '' && isValid;
    // }

    // if (rules.minLength) {
    //   isValid = value.length >= rules.minLength && isValid
    // }

    // if (rules.maxLength) {
    //   isValid = value.length <= rules.maxLength && isValid
    // }

    // if (rules.isEmail) {
    //   const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //   isValid = pattern.test(value) && isValid
    // }

    // if (rules.isNumeric) {
    //   const pattern = /^\d+$/;
    //   isValid = pattern.test(value) && isValid
    // }
    // return isValid
  //   return true
  // }
  checkValidity(value, rules) {
    let isValid = false

    if (rules.required) {
      isValid = value.trim() !== ''
    }

    if (rules.isEmail) {
      const emailPattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      isValid = emailPattern.test(value)
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength
    }
    return isValid
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };
    this.setState({ controls: updatedControls })
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  signinHandler = () => {
    this.setState(prevState => ({
      isSignup: !prevState.isSignup
    }))
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ))

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p style={{color: 'red'}}>{this.props.error.message}</p>
    }

    let auth = (
      <div className="Auth">
        {errorMessage}
        <form action="" onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button
          btnType="Danger"
          clicked={this.signinHandler}>{this.state.isSignup ? "Switch To Sign In": "Switch to Sign Up"}</Button>
      </div>
    )

    if (this.props.loading) {
      auth = <Spinner />
    }
    
    return auth;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);