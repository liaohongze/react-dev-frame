import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Login extends Component {
  handleClick = (e) => {
    e.preventDefault()
    const username = this.refs.username
    const password = this.refs.password
    const remember = this.refs.remember
    const creds = { username: username.value.trim(), password: password.value.trim(), remember: remember.value }
    this.props.onLogin(creds)
  }

  render() {
    const { errorMessage } = this.props
    return (
      <div>
        <input type='text' ref='username' placeholder='Username' />
        <input type='password' ref='password' placeholder='Password' />
        <input type='checkbox' ref='remember'>Remember Me?</input>
        <button onClick={(e) => this.handleClick(e)}>Login</button>
        {errorMessage &&
          <p style={{ color: 'red' }}>{errorMessage}</p>
        }
      </div>
    )
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}