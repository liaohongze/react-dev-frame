import React from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

const Fade = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    className='normal'
    timeout={{ enter: 500, exit: 300 }}
  >
    {children}
  </CSSTransition>
)

Fade.propTypes = {
  children: PropTypes.any
}

export default Fade