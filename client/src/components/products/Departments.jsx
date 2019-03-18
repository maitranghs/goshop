import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from "classnames"

import Loading from '../Loading'
import { setSearchCondition } from '../../actions'

class Departments extends Component {

  constructor(props) {
    super(props)
    this.fnSearchByDepartmentId = this.fnSearchByDepartmentId.bind(this)
  }

  fnSearchByDepartmentId(deparmentId) {
    const { setSearchCondition } = this.props
    setSearchCondition({ department_id: deparmentId, category_id: undefined })
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
              <li key={idx}>
                <a href={'#' + dep._id}
                  onClick={(e) => {e.preventDefault(); this.fnSearchByDepartmentId(dep._id)}}
                  className={classNames(
                    'dep-li collapsible-header waves-effect', 
                    {"dep-active": chosenDeparmentId === dep._id})}>
                  {dep.name}
                </a>
                {chosenDeparmentId === dep._id && 
                  <ul>
                  {dep.categories.map((cat, idx) =>
                    <li key={idx}
                      onClick={() => setSearchCondition({ category_id: cat._id })}>
                      <a href={'#' + cat._id}
                        className={classNames(
                          'cat-li collapsible-header waves-effect', 
                          {"cat-active": chosenCategoryId === cat._id})}
                        onClick={(e) => e.preventDefault()}>
                        {cat.name}
                      </a>
                    </li>)}
                  </ul>
                }
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