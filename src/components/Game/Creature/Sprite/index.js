import React, { useEffect, useCallback, memo } from "react"
import PropTypes from "prop-types"
import defaultSprite from "../../../../images/Sprites/human.png"
import { useDispatch } from "../../../../store/provider"
import { SpriteProps } from "../../../../store/reducers/Atlas/propTypes"
import {
  toggleSelectCreature,
  moveCreature
} from "../../../../store/reducers/Atlas/actions"

const Sprite = ({
  id,
  selected,
  position,
  url,
  width,
  height,
  worldWidth,
  worldHeight
}) => {
  const dispatch = useDispatch()

  const handleOnClick = useCallback(() => dispatch(toggleSelectCreature(id)), [
    id
  ])

  const observeMapBoundaries = useCallback(
    (oldPos, newPos) =>
      newPos[0] >= 0 &&
      newPos[0] <= worldWidth - width &&
      newPos[1] >= 0 &&
      newPos[1] <= worldHeight - height
        ? newPos
        : oldPos,
    [width, worldWidth, height, worldHeight]
  )

  const handleMovePlayer = useCallback(
    (newPosition) => {
      const observedPosition = observeMapBoundaries(position, newPosition)
      dispatch(moveCreature(id, observedPosition))
    },
    [id, position]
  )

  const handleKeyDown = (e) => {
    e.preventDefault()
    let newPosition
    // console.log(e.keyCode)
    switch (e.keyCode) {
      // WEST
      case 65:
      case 37:
        newPosition = [position[0] - width, position[1]]
        // console.log("WEST", position, width, newPosition)
        return handleMovePlayer(newPosition)

      // NORTH
      case 87:
      case 38:
        newPosition = [position[0], position[1] - height]
        // console.log("NORTH", position, width, newPosition)
        return handleMovePlayer(newPosition)

      // EAST
      case 68:
      case 39:
        newPosition = [position[0] + width, position[1]]
        // console.log("EAST", position, height, newPosition)
        return handleMovePlayer(newPosition)

      // SOUTH
      case 83:
      case 40:
        newPosition = [position[0], position[1] + height]
        // console.log("SOUTH", position, height, newPosition)
        return handleMovePlayer(newPosition)

      default:
        return
    }
  }

  useEffect(() => {
    selected && window.addEventListener("keydown", handleKeyDown)

    return () => {
      selected && window.removeEventListener("keydown", handleKeyDown)
    }
  })

  return (
    <div
      onClick={handleOnClick}
      style={{
        position: "relative",
        top: position[1],
        left: position[0],
        transition: "all 0.4s linear",
        backgroundImage: `url(${url})`,
        backgroundPosition: "0 0",
        width,
        height,
        zIndex: 9999
      }}
    />
  )
}

Sprite.propTypes = {
  ...SpriteProps
}

Sprite.defaultProps = {
  id: 1,
  position: [0, 0],
  url: defaultSprite,
  width: 40,
  height: 40
}

export default memo(Sprite)
