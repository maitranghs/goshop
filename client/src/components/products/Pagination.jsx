import React, { Component } from 'react'
import classNames from 'classnames'

class Pagination extends Component {
  render() {
    const { total, paginate, pageTotal, index } = this.props
    return (
      <div className="row">
        
        <div className="col s8 left-align">
          <ul className="pagination">
            <li className={classNames({'disabled': index === 1}, {'waves-effect': index !== 1})}>
              <a href="#first"
                onClick={(e) => {e.preventDefault(); if(index !== 1) paginate(1)}}>
                <i className="material-icons">chevron_left</i>
              </a>
            </li>
            {[...Array(pageTotal).keys()].map(key => 
              <li key={key} className={classNames({'active': key + 1 === index},{'waves-effect': key + 1 !== index})}>
                <a href={'#' + key}
                    onClick={(e) => {e.preventDefault(); if(key + 1 !== index) paginate(key + 1)}}>
                  {key + 1}
                </a>
              </li>)}
            <li className={classNames({'disabled': index === pageTotal}, {'waves-effect': index !== pageTotal})}>
              <a href="#last"
                onClick={(e) => {e.preventDefault(); if(index !== pageTotal) paginate(pageTotal)}}>
                <i className="material-icons">chevron_right</i>
              </a>
            </li>
          </ul>
        </div>

        <div className="col s4 right-align">
          <ul className="pagination">
            <li className="disabled"><a href='#total' onClick={(e) => e.preventDefault()}>{total} products total</a></li>
          </ul>
        </div>

      </div>
      
    )
  }
}

export default Pagination
