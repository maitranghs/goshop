import React, { Component } from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'

import CustomerDetails from './CustomerDetails'
import Payment from './Payment'
import Review from './Review'
import OrderSummary from './OrderSummary'

class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
      <main>
        <div className="row">
          <div className="col s7 m7 l7">
            <div className="container">
              <h5>Checkout</h5>
              <CustomerDetails/>

              <Elements>
                <Payment/>
              </Elements>
              
              <Review/>
              
              <a href="#place_the_order" className="btn right">Place The Order</a>
            </div>
          </div>
          <div className="col s5 m5 l5">
            <div className="row"><h5>Order Summary</h5></div>
            <OrderSummary/>
          </div>
        </div>
      </main>
      </StripeProvider>
    )
  }
}

export default Checkout