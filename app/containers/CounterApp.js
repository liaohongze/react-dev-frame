import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import * as CounterActions from '../actions/counter'

class CounterApp extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    counter: PropTypes.number
  }

  render() {
    const { counter, dispatch } = this.props
    return (
      <Counter counter={counter} {...bindActionCreators(CounterActions, dispatch)} />
    )
  }
}

function select(state) {
  return {
    counter: state.counter
  }
}

export default connect(select)(CounterApp)