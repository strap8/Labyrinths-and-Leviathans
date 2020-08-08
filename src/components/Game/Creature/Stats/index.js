import React, { memo } from "react"
import PropTypes from "prop-types"

const Stats = ({ position, sprite }) => (
  <div
    style={{
      position: "relative",
      top: position.y,
      left: position.x,
      backgroundImage: `url(${sprite.url})`,
      backgroundPosition: "0 0",
      width: sprite.spriteWidth,
      height: sprite.spriteHeight
    }}
  />
)

Stats.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  sprite: PropTypes.shape({
    url: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired
}

Stats.defaultProps = {
  position: { x: 0, y: 0 },
  sprite: {
    url: "",
    width: 40,
    height: 40
  }
}

export default memo(Stats)
