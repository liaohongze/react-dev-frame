import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import {logstatus} from './Auth'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    logstatus ? <Component {...props} /> : <Redirect to={{
      pathname: '/user/login',
      state: { from: props.location }
    }} />
  )} />
)

PrivateRoute.propTypes = {
  location: PropTypes.object,
  component: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { auth } = state
  const { token, isAuthenticated } = auth

  return {
    token,
    isAuthenticated
  }
}

export default connect(mapStateToProps)(PrivateRoute)