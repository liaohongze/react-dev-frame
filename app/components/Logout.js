import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Logout extends Component {
  render() {
    const { onLogout } = this.props
    return (
      <button onClick={() => onLogout()}>Logout</button>
    )
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired
}