import React, { useRef, useState, useEffect, useMemo, memo } from "react"
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

  const [showGridLines, setShowGridLines] = useState(true)

  const handleOnClick = () => {
    setShowGridLines((prevShow) => !prevShow)
  }

  useEffect(() => {
    drawGrid2()
    return () => {
      drawGrid2()
    }
  }, [canvasRef, height, width, squareSize, showGridLines])

  const drawGrid2 = () => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    let ctx = canvas.getContext("2d")

    //Draw background
    var background = new Image()
    background.src =
      "https://i.pinimg.com/originals/9c/4c/bf/9c4cbfcddc39adc49ba9847f64c7127f.jpg"
    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = () => {
      ctx.drawImage(
        background,
        0,
        0
        // width, height
      )

      if (showGridLines) {
        // Draw grid lines
        ctx.beginPath()
        for (var x = 0; x <= width; x += squareSize) {
          ctx.moveTo(x, 0)
          ctx.lineTo(x, height)
        }
        // set the color of the line
        ctx.strokeStyle = "red"
        ctx.lineWidth = 1
        // the stroke will actually paint the current path
        ctx.stroke()
        // for the sake of the example 2nd path
        ctx.beginPath()
        for (var y = 0; y <= height; y += squareSize) {
          ctx.moveTo(0, y)
          ctx.lineTo(width, y)
        }
        // set the color of the line
        ctx.strokeStyle = "red"
        // ctx.lineWidth = 5
        ctx.stroke()
      }
    }
  }

  return (
    <canvas
      ref={canvasRef}
      height={height}
      width={width}
      onClick={handleOnClick}
    />
  )
}

Canvas.propTypes = {
  size: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  height: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  width: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
}

Canvas.defaultProps = { squareSize: 32 }

export default connect(mapStateToProps)(memo(Canvas))
