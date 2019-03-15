import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardElement, injectStripe } from 'react-stripe-elements'

import { CREATE_STRIPE_TOKEN } from '../../actions/type'

class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      cardHolderName: ''
    }
    this.handleChangedCardElement = this.handleChangedCardElement.bind(this)
  }
  componentDidMount() {
    this.props.validate(this.state.error==='')
  }
  async handleChangedCardElement(change) {
    this.setState({ error: change.error })
    const { error, cardHolderName } = this.state,
    hasErrors = !change.complete || error,
    { validate, setSripe, stripe } = this.props
    validate(hasErrors)
    if (!hasErrors) {
      const stripeToken = await stripe.createToken({ name: cardHolderName })
      setSripe(stripeToken)
    }
  }
  render() {
    return (
      <div className="col s11 right">
        <h6>Payment Details</h6>
        <div className="row" style={{ margin: '20px 0' }}>

          <div className="input-field">
            <label htmlFor='stripe_card_name'>
              Card Holder's Name
            </label>
            <input name='stripe_card_name'
                type='text'
                id='stripe_card_name'
                value={this.state.cardHolderName}
                onChange={(e) => this.setState({ cardHolderName: e.target.value })}/>
            <div className="red-text" style={{ marginBottom: '20px' }}>
              {this.state.cardHolderName === '' && 'Required'}
            </div>
          </div>

          <CardElement
            onChange={(change) => this.handleChangedCardElement(change)}
            style={{base: {fontSize: '16px'}}}/>
            <div className="red-text" style={{ marginBottom: '20px', height: '10px' }}>
              {this.state.error && this.state.error.message}
            </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setSripe: ({ token }) => dispatch({ type: CREATE_STRIPE_TOKEN, payload: { token } })
})
export default injectStripe(connect(null, mapDispatchToProps)(Payment))