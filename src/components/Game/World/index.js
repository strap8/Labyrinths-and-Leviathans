import React, { memo } from "react"
import PropTypes from "prop-types"
import { connect } from "../../../store/provider"
import { GameMap, Creature } from "../../../components"

const mapStateToProps = (
  { Window: { innerHeight: heightFromStore, innerWidth: widthFromStore } },
  { size, height: heightFromProps, width: widthFromProps }
) => ({
  height: size || heightFromProps || heightFromStore,
  width: size || widthFromProps || widthFromStore
})

const World = ({ width, height }) => {
  return (
    <div style={{ position: "relative", width, height, margin: "0 auto" }}>
      <GameMap>
        <Creature.Sprite />
      </GameMap>
    </div>
  )
}

World.propTypes = {}

World.defaultProps = {}

export default connect(mapStateToProps)(memo(World))
