import React, { memo } from "react"
import PropTypes from "prop-types"
import defaultSprite from "../../../../images/Sprites/human.png"

const Sprite = ({ position, url, width, height }) => (
  <div
    style={{
      position: "relative",
      top: position.y,
      left: position.x,
      backgroundImage: `url(${url})`,
      backgroundPosition: "0 0",
      width,
      height,
      zIndex: 9999
    }}
  />
)

Sprite.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  }).isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

Sprite.defaultProps = {
  position: { x: 0, y: 0 },
  url: defaultSprite,
  width: 40,
  height: 40
}

export default memo(Sprite)
