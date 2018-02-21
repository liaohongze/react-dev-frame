import {connect} from 'react-redux'
import Test from '../components/Test'

const mapStateToProps = (state) => {
  const {color} = state
  return {
    color: color
  }
}

export default connect(mapStateToProps)(Test)