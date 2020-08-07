import React, { useMemo, memo } from "react"
import PropTypes from "prop-types"
import { PodcastsType } from "../../store/reducers/Podcasts/propTypes"
import { connect } from "../../store/provider"
import { Container, Row, Col, Button } from "reactstrap"
import { AddToHomeScreen, BasicCard, Header, Canvas } from "../../components"
import { RouterPush, RouteMap } from "../../store/reducers/router/actions"
import "./styles.css"

const mapStateToProps = ({ Podcasts: { items } }) => ({ podcasts: items })

const Home = ({ podcasts, prompt, promptToInstall }) => {
  return (
    <article>
      <Canvas />
    </article>
  )
}

Home.propTypes = { podcasts: PodcastsType.isRequired }

Home.defaultProps = {}

export default connect(mapStateToProps)(memo(Home))
