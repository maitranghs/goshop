import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

import { toggleShowModal } from '../../actions/notification'

class Notification extends Component {
  render() {
    const { show, title, content, close } = this.props
    return (
      <div>
        <div className={classNames('modal bottom-sheet', { 'modal-bottom-noti': show })}>
          <div className="modal-content">
            <h5>{title}</h5>
            <p>{content}</p>
          </div>
          <div className="modal-footer">
            <a href="#Ok"
              onClick={(e) => { e.preventDefault(); close()}}
              className="modal-close waves-effect btn pink lighten-1">
              OK
            </a>
          </div>
        </div>
        <div className={classNames('modal-overlay', { 'modal-overlay-show': show })}></div>
      </div>
    )
  }
}
const mapStateToProps = (state) => (state.notification)
const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(toggleShowModal(false))
})
export default connect(mapStateToProps, mapDispatchToProps)(Notification)