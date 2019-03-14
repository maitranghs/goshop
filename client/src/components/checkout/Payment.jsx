import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CardElement, injectStripe } from 'react-stripe-elements'

class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: ''
    }
    this.handleChangedCardElement = this.handleChangedCardElement.bind(this)
  }
  componentDidMount() {
    this.props.validate(this.state.error==='')
  }
  handleChangedCardElement(change) {
    this.setState({ error: change.error })
    const { error } = this.state
    this.props.validate(!change.complete || error)
  }
  render() {
    return (
      <div className="col s11 right">
        <h6>Payment Details</h6>
        <div className="row" style={{ margin: '20px 0' }}>
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

export default injectStripe(connect()(Payment))