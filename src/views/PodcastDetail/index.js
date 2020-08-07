import React, { useState, useEffect, useMemo, memo } from "react"
import PropTypes from "prop-types"
import { connect } from "../../store/provider"
import { GetPodcastDetail } from "../../store/reducers/Podcasts/actions"
import { PodcastType } from "../../store/reducers/Podcasts/propTypes"
import { Container, Row, Col, Media, Jumbotron } from "reactstrap"
import { PageNotFound } from "../"
import "./styles.css"

const mapStateToProps = (
  { Podcasts: { items, filteredItems } },
  { videoId }
) => {
  const podcast = items
    .concat(filteredItems)
    .find((podcast) => podcast.id.videoId == videoId)
  if (!podcast) {
    return { id: {}, snippet: { thumbnails: {} } }
  } else {
    return podcast
  }
}

const mapDispatchToProps = { GetPodcastDetail }

const PodcastDetail = ({
  id: { videoId, detailId },
  snippet: {
    publishedAt,
    channelId,
    title,
    description,
    thumbnails: { default: defaultImage, medium, high, standard, maxres },
    channelTitle,
    tags,
    categoryId,
    liveBroadcastContent,
    localized,
    defaultAudioLanguage,
    publishTime,
  },
  GetPodcastDetail,
  height,
  width,
}) => {
  const [isLoading, setIsLoading] = useState(true)

  const handleOnLoad = () => setIsLoading(false)

  const { imageHeight, imageWidth, imageUrl } = useMemo(() => {
    let imageHeight, imageWidth, imageUrl

    if (!medium) return { imageHeight, imageWidth, imageUrl }

    if (maxres) {
      imageHeight = maxres.height / 2
      imageWidth = maxres.width / 2
      imageUrl = maxres.url
    } else {
      imageHeight = medium.height * 2
      imageWidth = medium.width * 2
      imageUrl = medium.url
    }

    return { imageHeight, imageWidth, imageUrl }
  }, [medium, maxres])

  useEffect(() => {
    // If the podcast isn't found in the store or the podcast detail hasn't been fetched
    if (!videoId || (videoId && !maxres)) {
      GetPodcastDetail(videoId)
    }
  }, [])

  if (!videoId) {
    return <PageNotFound />
  }

  return (
    <Container className="PodcastDetail Container mt-3">
      <Row>
        <Col xs={12} tag="h2">
          <b>{title}</b>
        </Col>
      </Row>
      <Row>
        {isLoading && (
          <Col xs={12}>
            <i className="fas fa-spinner fa-spin fa-4x Center" />
          </Col>
        )}
      </Row>
      <Row tag={Jumbotron} className="PodcastDetailImageContainer p-3">
        <Col xs={3} className="pl-0 pr-2">
          <Media
            className="PodcastDetailImage"
            height="100%"
            width={imageWidth}
            src={imageUrl}
          />
        </Col>
        <Col xs={9} className="p-0">
          <iframe
            className="PodcastDeatilVideo"
            title={title}
            name={title}
            src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&&showinfo=0&fs=0&showsearch=0&autoplay=0&ps=docs&controls=1`}
            // srcDoc=
            height="100%"
            width={width}
            // marginHeight={}
            // marginWidth={}
            frameBorder={0}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={false}
            // allowTransparency
            // referrerPolicy=
            // sandbox=
            // scrolling=
            seamless
            onLoad={handleOnLoad}
          />
        </Col>
      </Row>
      <Row className="PodcastDetailDescriptionContainer py-3">
        <Col xs={12} tag="p">
          {description}
        </Col>
      </Row>
    </Container>
  )
}

const thumnailPropType = PropTypes.shape({
  url: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
}).isRequired

PodcastDetail.propTypes = {
  ...PodcastType,
  GetPodcastDetail: PropTypes.func.isRequired,
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
}

PodcastDetail.defaultProps = { height: "180px", width: "100%" }

export default connect(mapStateToProps, mapDispatchToProps)(memo(PodcastDetail))
