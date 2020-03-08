import React, { useState } from "react"
import PropTypes from "prop-types"
import { Container, Row, Col } from "reactstrap"
import { connect as reduxConnect } from "react-redux"
import { withRouter } from "react-router-dom"
import Figurine from "../../components/Figurine"
import "./styles.css"

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {}

const getInitialState = ({}) => {
  return { xPosition: 0, yPosition: 0 }
}

const GameBoard = props => {
  const [state, setState] = useState(getInitialState(props))
  const { xPosition, yPosition } = state

  const setPosition = (position, direction) =>
    setState(currentState => ({
      ...currentState,
      [position]: currentState[position] + direction
    }))

  const handleKeyPress = event => {
    const SPEED = 10
    const { key } = event
    switch (key) {
      case "a":
        return setPosition("xPosition", -SPEED)
      case "d":
        return setPosition("xPosition", SPEED)
      case "w":
        return setPosition("yPosition", -SPEED)
      case "s":
        return setPosition("yPosition", SPEED)

      default:
        return
    }
  }

  return (
    <div className="GameBoard" onKeyDown={handleKeyPress} tabIndex="0">
      <Figurine xPosition={xPosition} yPosition={yPosition} />
    </div>
  )
}

GameBoard.propTypes = {}

GameBoard.defaultProps = {}

export default withRouter(
  reduxConnect(mapStateToProps, mapDispatchToProps)(GameBoard)
)
