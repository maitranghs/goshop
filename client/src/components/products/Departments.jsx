import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from "classnames"

import Loading from '../Loading'
import { setSearchCondition } from '../../actions'

class Departments extends Component {

  constructor(props) {
    super(props)
    this.state = {
      deparmentId: ''
    }
    this.fnSearchByDepartmentId = this.fnSearchByDepartmentId.bind(this)
  }

  fnSearchByDepartmentId(deparmentId) {

    this.setState({ deparmentId })

    const { setSearchCondition } = this.props
    setSearchCondition({ department_id: deparmentId })
  }

  render() {
    const { departments, setSearchCondition, chosenDeparmentId, chosenCategoryId } = this.props
    return (
      <div>
        <h5 className="left-align blue-grey-text text-darken-3">Departments</h5>
        <div className="divider"></div>
        {departments.length === 0 && <Loading/>}
        {departments.length > 0 && 
          <ul>
            {departments.map((dep, idx) =>
              <li key={idx}
                  className={classNames("dep-li", {"dep-active": chosenDeparmentId === dep._id})}
                  onClick={() => this.fnSearchByDepartmentId(dep._id)}>
                <a href={'#' + dep._id} onClick={(e) => e.preventDefault()}
                  className="blue-grey-text text-darken-3">
                  {dep.name}
                </a>
                {this.state.deparmentId === dep._id && <ul>
                  {dep.categories.map((cat, idx) =>
                    <li className={classNames("dep-li", {"dep-active": chosenCategoryId === cat._id})}
                        key={idx} onClick={() => setSearchCondition({ category_id: cat._id })}>
                      <a href={'#' + cat._id} onClick={(e) => e.preventDefault()}>{cat.name}</a>
                    </li>)}
                </ul>}
              </li>
            )}
          </ul>
        }
      </div>
    )
  }
  
}

const mapStateToProps = (state) => ({
  departments: state.departments,
  chosenDeparmentId: state.products.options.department_id,
  chosenCategoryId: state.products.options.category_id
})

const mapDispatchToProps = (dispatch) => ({
  setSearchCondition: (option) => dispatch(setSearchCondition(option))
})

export default connect(mapStateToProps, mapDispatchToProps)(Departments)