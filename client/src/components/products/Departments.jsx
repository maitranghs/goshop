import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loading from '../Loading'
import { setSearchCondition } from '../../actions'

class Departments extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowDropdown: false,
      categories: []
    }
    this.fnSearchByDepartmentId = this.fnSearchByDepartmentId.bind(this)
  }

  fnSearchByDepartmentId(categories, deparmentId) {

    this.setState({ isShowDropdown: true, categories })

    const { setSearchCondition } = this.props
    setSearchCondition({ department_id: deparmentId })
  }

  render() {
    const { departments, setSearchCondition } = this.props
    const { isShowDropdown, categories } = this.state
    return (
      <div>
        <h5 className="left-align blue-grey-text text-darken-3">Departments</h5>
        <div className="divider"></div>
        {departments.length === 0 && <Loading/>}
        {departments.length > 0 && 
          <div className="collection">
            {departments.map((dep, idx) =>
                <a key={idx} href={'#' + dep._id}
                  onClick={() => this.fnSearchByDepartmentId(dep.categories, dep._id)}
                  className="collection-item dropdown-trigger blue-grey-text text-darken-3">
                  {dep.name}
                  <i className="material-icons right">arrow_drop_down</i>
                </a>
              )
            }
          </div>
        }
        {isShowDropdown &&
          <ul id="dropdown2">
            {categories.map((cat, idx) =>
              <li key={idx} onClick={() => setSearchCondition({ category_id: cat._id })}>
                <a href={'#' + cat._id}>{cat.name}</a>
              </li>)}
          </ul>
        }
      </div>
    )
  }
  
}

const mapStateToProps = (state) => ({
  departments: state.departments
})

const mapDispatchToProps = (dispatch) => ({
  setSearchCondition: (option) => dispatch(setSearchCondition(option))
})

export default connect(mapStateToProps, mapDispatchToProps)(Departments)