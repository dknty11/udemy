import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import * as actions from '../../../store/actions/index'
import './ContactData.css'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: this.props.contactData ? this.props.contactData.name : ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: this.props.contactData ? this.props.contactData.email : ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: this.props.contactData ? this.props.contactData.street : ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: this.props.contactData ? this.props.contactData.country : ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: this.props.contactData ? this.props.contactData.zipCode : ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'COD', displayValue: 'Cash on Deliver'},
            {value: 'Cash', displayValue: 'Cash'},
          ]
        },
        value: this.props.contactData ? this.props.contactData.email : 'COD'
      }
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement
    this.setState({ orderForm: updatedOrderForm })
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }
    // We always receive this dispatch function from props
    this.props.onPurchaseBurger(order)
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form action="" onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        {this.props.contactData ? <Button btnType="Success">UPDATE</Button> : <Button btnType="Success">ORDER</Button> }
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className="ContactData">
        <h4>Enter your Contact Data</h4>
          {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.globalIngredients.ingredients,
    price: state.price.totalPrice,
    loading: state.orders.loading,
    contactData: state.order.order.orderData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurger: (order) => dispatch(actions.purchaseBurger(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));