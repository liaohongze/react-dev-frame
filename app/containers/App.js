import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Router, Route } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import createHistory from 'history/createBrowserHistory'
import { asyncComponent } from '../common/AsyncComponent'
import * as globalActions from '../actions/global'
import '../styles/app.scss'

import Home from '../components/Home'
import CounterApp from './CounterApp'

const About = asyncComponent(() => import('../components/About'))
const history = createHistory()

@connect(
  state => state,
  dispatch => bindActionCreators(globalActions, dispatch)
)
export default class App extends Component {
  static propTypes = {
    global: PropTypes.object,
    children: PropTypes.any
  }

  render() {
    const { children, animateCls } = this.props.global
    return (
      <Router history={history}>
        <Route render={({ location }) => {
          return (
            <CSSTransition
              in={true}
              timeout={{ enter: 500, exit: 300 }}
              classNames={animateCls}>
              <div key={location.pathname}>
                {children}
                <Route location={location} exact path='/' component={Home} />
                <Route location={location} path='/about' component={About} />
                <Route location={location} path='/counter' component={CounterApp} />
              </div>
            </CSSTransition>
          )
        }} />
      </Router>
    )
  }
}
