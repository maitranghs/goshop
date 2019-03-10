import React from 'react'

const Footer = () => (
  <footer className="page-footer grey lighten-5">
    <div className="container">
      <div className="row">
        <div className="col s4">
          <h5 className="grey-text text-darken-3">Questions?</h5>
          <ul>
            <li><a className="grey-text text-lighten-1" href="#!">Help</a></li>
            <li><a className="grey-text text-lighten-1" href="#!">Track Order</a></li>
            <li><a className="grey-text text-lighten-1" href="#!">Returns</a></li>
          </ul>
        </div>
        <div className="col s4">
          <h5 className="grey-text text-darken-3">What's In Store</h5>
          <ul>
            <li><a className="grey-text text-lighten-1" href="#!">Women</a></li>
            <li><a className="grey-text text-lighten-1" href="#!">Men</a></li>
            <li><a className="grey-text text-lighten-1" href="#!">Product A-Z</a></li>
            <li><a className="grey-text text-lighten-1" href="#!">Buy Gift Voucher</a></li>
          </ul>
        </div>
        <div className="col s4">
          <h5 className="grey-text text-darken-3">Follow Us</h5>
          <ul>
            <li><a className="grey-text text-lighten-1" href="#!">Facebook</a></li>
            <li><a className="grey-text text-lighten-1" href="#!">Twitter</a></li>
            <li><a className="grey-text text-lighten-1" href="#!">Youtube</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container grey-text text-lighten-1">
      © 2019 Shiro, All rights reserved.
      <a className="grey-text text-lighten-1 right" href="https://github.com/maitranghs">My Github</a>
      </div>
    </div>
  </footer>
)

export default Footer