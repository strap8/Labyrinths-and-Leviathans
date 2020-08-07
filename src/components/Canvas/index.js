import React, { useRef, useEffect, useMemo, memo } from "react"
import { connect } from "../../store/provider"
import PropTypes from "prop-types"

const mapStateToProps = (
  { Window: { innerHeight: heightFromStore, innerWidth: widthFromStore } },
  { size, height: heightFromProps, width: widthFromProps }
) => ({
  height: size || heightFromProps || heightFromStore,
  width: size || widthFromProps || widthFromStore
})

const Canvas = ({ height, width, squareSize }) => {
  const canvasRef = useRef()

  useEffect(() => {
    drawGrid2(height, width, squareSize)
    return () => {
      drawGrid2(height, width, squareSize)
    }
  }, [canvasRef, height, width, squareSize])

  const drawGrid2 = (h, w, step) => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let ctx = canvas.getContext("2d")
    ctx.beginPath()

    for (var x = 0; x <= w; x += step) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
    }
    // set the color of the line
    ctx.strokeStyle = "gray"
    ctx.lineWidth = 1
    // the stroke will actually paint the current path
    ctx.stroke()
    // for the sake of the example 2nd path
    ctx.beginPath()
    for (var y = 0; y <= h; y += step) {
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
    }
    // set the color of the line
    ctx.strokeStyle = "gray"
    // ctx.lineWidth = 5
    ctx.stroke()
  }

  return <canvas ref={canvasRef} height={height} width={width} />
}

Canvas.propTypes = {
  size: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  height: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  width: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
}

Canvas.defaultProps = { squareSize: 80 }

export default connect(mapStateToProps)(memo(Canvas))
