import React, { memo } from "react"
import PropTypes from "prop-types"
import { connect } from "../../../store/provider"
import { GameMap, Creature } from "../../../components"

const mapStateToProps = ({ Podcasts: { items } }) => ({ podcasts: items })

const Atlas = ({}) => {
  return (
    <div>
      <GameMap>
        <Creature.Sprite />
      </GameMap>
    </div>
  )
}

Atlas.propTypes = {}

Atlas.defaultProps = {}

export default connect(mapStateToProps)(memo(Atlas))
