import React from "react"
import PropTypes from "prop-types"
import { connect } from "../../store/provider"
import { Container, Row, Col } from "reactstrap"
import "./styles.css"

const mapStateToProps = ({}) => ({})

const PageNotFound = ({}) => (
  <Container className="Container">
    <Row>
      <Col xs={12} tag="h1">
        PAGE NOT FOUND
      </Col>
    </Row>
  </Container>
)

PageNotFound.propTypes = {
  title: PropTypes.string,
  history: PropTypes.object,
}

PageNotFound.defaultProps = {}

export default connect(mapStateToProps)(PageNotFound)
