import React, { memo } from "react"
import PropTypes from "prop-types"
import { connect } from "../../../store/provider"
import { GameMap, Creature } from "../../../components"

const mapStateToProps = (
  {
    Window: { innerHeight: heightFromStore, innerWidth: widthFromStore },
    Atlas: {
      World: { Creatures }
    }
  },
  { size, height: heightFromProps, width: widthFromProps }
) => ({
  height: size || heightFromProps || heightFromStore,
  width: size || widthFromProps || widthFromStore,
  Creatures
})

const World = ({ width, height, Creatures }) => {
  const renderCreatures = Creatures.map((c) => (
    <Creature.Sprite {...c} worldWidth={width} worldHeight={height} />
  ))

  return (
    <div style={{ position: "relative", width, height, margin: "0 auto" }}>
      <GameMap>{renderCreatures}</GameMap>
    </div>
  )
}

World.propTypes = {}

World.defaultProps = {}

export default connect(mapStateToProps)(memo(World))
