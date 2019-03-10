import React, { Component } from 'react'

class Breadcrumb extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <div className="col s12 teal lighten-2">
              <a className="breadcrumb" href="#!">All</a>
              <a className="breadcrumb" href="#!">Reagional</a>
              <a className="breadcrumb" href="#!">Italian</a>
            </div>
          </div>
        </nav>
        <div className="divider"></div>
      </div>
    )
  }
}

export default Breadcrumb