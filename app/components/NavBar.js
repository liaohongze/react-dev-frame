import React from 'react'
import PropTypes from 'prop-types'
import Login from './Login'
import Logout from './Logout'
import { login, logout } from '../actions'

const NavBar = ({ dispatch, isAuthenticated, errorMessage }) =>
  <nav>
    <div>
      {!isAuthenticated &&
        <Login
          errorMessage={errorMessage}
          onLogin={creds => dispatch(login(creds))}
        />
      }
      {isAuthenticated &&
        <Logout onLogout={() => dispatch(logout())} />
      }
    </div>
  </nav>

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
}

export default NavBar