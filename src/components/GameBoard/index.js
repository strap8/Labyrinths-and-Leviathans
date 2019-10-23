import React, { PureComponent } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "reactstrap"
import { connect as reduxConnect } from "react-redux"
import { withRouter } from "react-router-dom"
import Figurine from "../Figurine"
import KeyboardEventHandler from "react-keyboard-event-handler"
import "./styles.css"

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {}

class GameBoard extends PureComponent {
  constructor(props) {
    super(props)

    this.state = { xPosition: 0, yPosition: 0 }
  }

  static propTypes = {}

  static defaultProps = {}

  componentWillMount() {
    this.getState(this.props)
  }

  componentWillUpdate(nextProps, nextState) {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    this.getState(nextProps)
  }

  getState = props => {
    this.setState({})
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  setPosition = (position, direction) =>
    this.setState(currentState => ({
      [position]: currentState[position] + direction
    }))

  handleKeyPress = event => {
    const SPEED = 10
    const { key } = event
    console.log(key)
    switch (key) {
      case "a":
        return this.setPosition("xPosition", -SPEED)
      case "d":
        return this.setPosition("xPosition", SPEED)
      case "w":
        return this.setPosition("yPosition", -SPEED)
      case "s":
        return this.setPosition("yPosition", SPEED)

      default:
        return
    }
  }

  render() {
    const { xPosition, yPosition } = this.state
    return (
      <div className="GameBoard" onKeyDown={this.handleKeyPress} tabIndex="0">
        <Figurine xPosition={xPosition} yPosition={yPosition} />
      </div>
    )
  }
}
export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(GameBoard)
)
