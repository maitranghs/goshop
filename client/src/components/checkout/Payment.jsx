import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardElement, injectStripe } from 'react-stripe-elements'

class Payment extends Component {
  render() {
    return (
      <div className="col s11 right">
        <h6>Payment Details</h6>
        <div className="row" style={{ margin: '20px 0' }}><CardElement style={{base: {fontSize: '16px'}}}/></div>
      </div>
    )
  }
}

export default injectStripe(connect()(Payment))