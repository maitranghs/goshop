import React from 'react'

const CartSummary = ({ summary }) => (
  <div className="row"> 
    <h5>Summary</h5>
    <div className="row grey-text text-darken-1">
      <div className="col s8 m8 l8">Subtotal</div>
      <div className="col s3 m3 l3">${summary.subtotal.toFixed(2)}</div>
    </div>
    <div className="row grey-text text-darken-1">
      <div className="col s8 m8 l8">Discount</div>
      <div className="col s3 m3 l3">-${summary.discount.toFixed(2)}</div>
    </div>
    <div className="row grey-text text-darken-1">
      <div className="col s8 m8 l8">Tax</div>
      <div className="col s3 m3 l3">${summary.tax.toFixed(2)}</div>
    </div>
    <div className="row grey-text text-darken-1">
      <div className="col s8 m8 l8">Shipping</div>
      <div className="col s3 m3 l3">${summary.shipping.toFixed(2)}</div>
    </div>
    <div className="row grand-total grey-text text-darken-3">
      <div className="col s8 m8 l8">Grandtotal</div>
      <div className="col s3 m3 l3">${summary.grandtotal.toFixed(2)}</div>
    </div>
  </div>
)

export default CartSummary