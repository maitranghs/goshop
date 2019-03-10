import React, { Component } from 'react'

class Filter extends Component {
  render() {
    return (
      <div>
        <h5 className="left-align blue-grey-text text-darken-3">Filter</h5>
        <div className="divider"></div>
        <div className="section">
          <h6>Color</h6>
          <ul className="row">
            {['blue', 'purple', 'orange', 'green', 'red', 'black', 'yellow', 'gray', 'white', 'brown'].map((e,i) => 
              <li key={i} className="col s2">
                <a href="#!" className="btn" style={{'backgroundColor': e, 'marginBottom': '10px', height: '34px', width: '34px', 'borderRadius': '50%'}}>&nbsp;</a>
              </li>
            )}
          </ul>
        </div>

        <div className="section">
          <h6>Size</h6>
          <ul className="row">
            {['XS', 'S', 'M', 'L', 'XL', 28, 29, 30, 31, 32].map((e,i) => 
              <li className="col s2" key={i}>
                <a href="#!" className="btn grey-text text-lighten-1 white" style={{'marginBottom': '10px', height: '40px', width: '40px', 'border': '1px #bdbdbd solid', 'boxShadow': 'none', padding: 0}}>{e}</a>
              </li>
            )}
          </ul>
        </div>

        <div className="section">
          <h6>Price</h6>
          <p>
            <label>
              <input type="radio" name="groupPrice" className="filled-in"/>
              <span>&#60;$50</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio" name="groupPrice" className="filled-in"/>
              <span>$50-100</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio" name="groupPrice" className="filled-in"/>
              <span>$100-150</span>
            </label>
          </p>
          <p>
            <label>
              <input type="radio" name="groupPrice" className="filled-in"/>
              <span>&#62;$150</span>
            </label>
          </p>
        </div>

        <div className="right-align">
          <a href="#!" className="waves-effect waves-light btn">Clear</a>
        </div>

      </div>
    )
  }
}

export default Filter