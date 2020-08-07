import React, { useMemo, lazy, memo } from "react"
import PropTypes from "prop-types"
import { PodcastsType } from "../../store/reducers/Podcasts/propTypes"
import { connect } from "../../store/provider"
import { Container, Row, Col, Button } from "reactstrap"
import { AddToHomeScreen, BasicCard, Header } from "../../components"
import { RouterPush, RouteMap } from "../../store/reducers/router/actions"
import "./styles.css"

const Podcast = lazy(() => import("../../components/Podcast"))

const mapStateToProps = ({ Podcasts: { items } }) => ({ podcasts: items })

const Home = ({ podcasts, prompt, promptToInstall }) => {
  const renderPodcasts = useMemo(
    () =>
      podcasts.map((podcast) => (
        <Col
          className="pt-2 pt-sm-3 px-2"
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          key={podcast.id.detailId || podcast.id.videoId}
        >
          <Podcast {...podcast} />
        </Col>
      )),
    [podcasts]
  )

  return (
    <Container tag="article" className="Home Container">
      <Row>{renderPodcasts}</Row>
    </Container>
  )
}

Home.propTypes = { podcasts: PodcastsType.isRequired }

Home.defaultProps = {}

export default connect(mapStateToProps)(memo(Home))
