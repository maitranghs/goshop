import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <nav className="top-nav grey lighten-5">
          <div className="container">
            <div className="nav-wrapper">
              <a href="#!" className="brand-logo teal-text text-lighten-2">&nbsp;&nbsp;Go Shop</a>
              <ul className="right hide-on-med-and-down">
                <li><a className="blue-grey-text text-darken-3" href="#!"><i className="material-icons right">search</i></a></li>
                <li><a className="blue-grey-text text-darken-3" href="#!"><i className="material-icons right">shopping_cart</i></a></li>
                <li><a className="blue-grey-text text-darken-3" href="#!"><i className="material-icons right">account_box</i></a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header