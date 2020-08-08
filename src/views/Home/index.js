import React, { useMemo, memo } from "react"
import PropTypes from "prop-types"
import { connect } from "../../store/provider"
import { Container, Row, Col, Button } from "reactstrap"
import { World } from "../../components"
import { RouterPush, RouteMap } from "../../store/reducers/router/actions"
import "./styles.css"

const mapStateToProps = ({}) => ({})

const Home = ({ podcasts, prompt, promptToInstall }) => {
  return (
    <>
      <World />
    </>
  )
}

Home.propTypes = {}

Home.defaultProps = {}

export default connect(mapStateToProps)(memo(Home))
