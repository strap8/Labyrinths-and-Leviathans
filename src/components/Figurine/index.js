import React, { memo } from "react"
import PropTypes from "prop-types"

const Figurine = ({ xPosition, yPosition, style }) => {
  style = { ...style, top: yPosition, left: xPosition }

  return <div style={style}>Fig</div>
}

Figurine.propTypes = {
  xPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  yPosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object
}

Figurine.defaultProps = {
  style: {
    position: "absolute",
    top: 200,
    left: 24,
    height: 36,
    width: 36,
    borderRadius: "50%",
    backgroundColor: "red",
    textAlign: "center"
  }
}

export default memo(Figurine)
