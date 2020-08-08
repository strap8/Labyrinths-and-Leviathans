import React, { useRef, useState, useEffect, useMemo, memo } from "react"
import { connect } from "../../../store/provider"
import PropTypes from "prop-types"

const mapStateToProps = (
  { Window: { innerHeight: heightFromStore, innerWidth: widthFromStore } },
  { size, height: heightFromProps, width: widthFromProps }
) => ({
  height: size || heightFromProps || heightFromStore,
  width: size || widthFromProps || widthFromStore
})

const GameMap = ({ background, children }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background,
        border: "4px solid white"
      }}
    >
      {children}
    </div>
  )
}

GameMap.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  background: PropTypes.string.isRequired
}

GameMap.defaultProps = { background: "rgba(39, 174, 96, 1)" }

export default connect(mapStateToProps)(memo(GameMap))
