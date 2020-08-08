import React, { lazy, memo } from "react"
import PropTypes from "prop-types"
import { connect } from "../../store/provider"
import { Container, Row, Col, Media, Jumbotron } from "reactstrap"
import { PageNotFound } from ".."
import { AddToHomeScreen, BasicCard, Header } from "../../components"

import { RouteMap, RouterPush } from "../../store/reducers/router/actions"
import "./styles.css"

const Footer = lazy(() => import("../../components/Footer"))

const mapStateToProps = ({}) => ({})

const About = ({}) => {
  return (
    <Container tag="article" className="About Container">
      <Row className="mt-3 mt-sm-4">
        <Col xs={12}>
          <Footer />
        </Col>
      </Row>
    </Container>
  )
}

About.propTypes = {
  prompt: PropTypes.any,
  promptToInstall: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(memo(About))
