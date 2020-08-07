import React, { useCallback, useMemo, memo } from "react"
import { PodcastType } from "../../store/reducers/Podcasts/propTypes"
import { Link } from "react-router-dom"
import { Media } from "reactstrap"
import { BasicCard } from "../"
import { GetPodcastDetailUrl } from "../../store/reducers/router/actions"
import "./styles.css"

const Podcast = ({
  id: { videoId, detailId },
  snippet: {
    publishedAt,
    channelId,
    title,
    description,
    thumbnails: {
      default: defaultImage,
      medium: { url: imageUrl },
      high,
      standard,
      maxres,
    },
    channelTitle,
    tags,
    categoryId,
    liveBroadcastContent,
    localized,
    defaultAudioLanguage,
    publishTime,
  },
}) => {
  const url = GetPodcastDetailUrl(videoId)

  const handleOnClick = useCallback((e) => e && e.stopPropagation(), [])

  const header = useMemo(
    () => (
      <Link to={url} name={description}>
        <Media
          className="PodcastImage"
          height={220}
          width="100%"
          src={imageUrl}
        />
      </Link>
    ),
    [url, description, imageUrl]
  )

  const cardTitle = useMemo(
    () => ({ name: description, render: <Link to={url}>{title}</Link> }),
    [description, title, url]
  )

  const cardText = useMemo(
    () => <div className="Overflow px-2 pb-2">{description}</div>,
    [description]
  )

  return (
    <BasicCard
      onClickCallback={handleOnClick}
      cardClassName="Podcast"
      cardBodyClassName="PodcastBody p-0"
      cardHeaderClassName="PodcastHeader"
      header={header}
      cardTitleClassName="PodcastTitle OverflowWrap px-2 pt-1"
      title={cardTitle}
      text={cardText}
    />
  )
}

Podcast.propTypes = PodcastType

Podcast.defaultProps = {}

export default memo(Podcast)
