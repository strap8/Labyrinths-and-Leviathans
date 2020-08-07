import React, { memo } from "react"
import { Container, Row, Col } from "reactstrap"
import { Header } from "../../components"
import { RouteMap } from "../../store/reducers/router/actions"
import "./styles.css"

const PrivacyPolicy = () => (
  <Container className="PrivacyPolicy Container">
    <Row>
      <Col xs={12}>
        <Header>Privacy Policy</Header>
        <p>Let's make this simple.</p>
        <p>Our privacy is important to me.</p>
        <p>
          I do not sell or reveal your personal data to any person or entity.
        </p>
        <p>
          Google Analytics is used to record{" "}
          <a
            href="https://support.google.com/analytics/answer/6004245?hl=en"
            target="_blank"
          >
            basic visit data
          </a>
          .
        </p>
      </Col>
    </Row>
  </Container>
)

export default memo(PrivacyPolicy)
