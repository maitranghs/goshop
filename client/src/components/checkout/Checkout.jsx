import React, { Component } from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import classNames from 'classnames'
import { connect } from 'react-redux'

import CustomerDetails from './CustomerDetails'
import Payment from './Payment'
import Review from './Review'
import OrderSummary from './OrderSummary'

import { placeOrder } from '../../actions'
import { CREATE_STRIPE_TOKEN } from '../../actions/type'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paymentErrors: true
    }
  }
  render() {
    const { history, customerDetailsFormErrors, reviewFormErrors, products, summary, placeOrder, setSripe } = this.props
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
      <main>
        <div className="row">
          <div className="col s7 m7 l7">
            <div className="container">
              <h5>Checkout</h5>
              <CustomerDetails/>

              <Elements>
                <Payment validate={(hasErrors) => this.setState({ paymentErrors: hasErrors })} setSripe={setSripe}/>
              </Elements>
              
              <Review/>
              
              <a href="#place_the_order"
                className={classNames("btn right pink lighten-1",
                  { 'disabled': this.state.paymentErrors || customerDetailsFormErrors || reviewFormErrors })}
                onClick={(e) => {e.preventDefault();placeOrder(history)}}>
                Place The Order
              </a>
            </div>
          </div>
          <div className="col s5 m5 l5">
            <div className="row"><h5>Order Summary</h5></div>
            <OrderSummary products={products} summary={summary}/>
          </div>
        </div>
      </main>
      </StripeProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  customerDetailsFormErrors: state.form.customerDetailsForm && state.form.customerDetailsForm.syncErrors,
  reviewFormErrors: state.form.reviewForm && state.form.reviewForm.syncErrors,
  products: state.cart.products,
  summary: state.cart.summary
})
const mapDispatchToProps = (dispatch) => ({
  placeOrder: (history) => dispatch(placeOrder(history)),
  setSripe: ({ token }) => dispatch({ type: CREATE_STRIPE_TOKEN, payload: { token } })
})
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
