import PropTypes from "prop-types"

const PodcastIdType = PropTypes.shape({
  kind: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  detailId: PropTypes.string,
})

const PodcastSnippetThumbnailType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
})

const PodcastSnippetThumbnailsType = PropTypes.shape({
  default: PodcastSnippetThumbnailType.isRequired,
  medium: PodcastSnippetThumbnailType.isRequired,
  high: PodcastSnippetThumbnailType.isRequired,
  standard: PodcastSnippetThumbnailType,
  maxres: PodcastSnippetThumbnailType,
})

const PodcastSnippetTypeLocalizedType = PropTypes.shape({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
})

const PodcastSnippetType = PropTypes.shape({
  publishedAt: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnails: PodcastSnippetThumbnailsType.isRequired,
  channelTitle: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  categoryId: PropTypes.string,
  liveBroadcastContent: PropTypes.string.isRequired,
  localized: PodcastSnippetTypeLocalizedType,
  defaultAudioLanguage: PropTypes.string,
  publishTime: PropTypes.string,
})

const PodcastType = PropTypes.shape({
  kind: PropTypes.string.isRequired,
  etag: PropTypes.string.isRequired,
  id: PodcastIdType.isRequired,
  snippet: PodcastSnippetType.isRequired,
})

const PodcastsType = PropTypes.arrayOf(PodcastType)

const YouTubeChannelProfileIdType = PropTypes.shape({
  kind: PropTypes.string.isRequired,
  channelId: PropTypes.string.isRequired,
})

const YouTubeChannelProfileSnippetThumbnailType = PropTypes.shape({
  url: PropTypes.string.isRequired,
})

const YouTubeChannelProfileSnippetThumbnailsType = PropTypes.shape({
  default: YouTubeChannelProfileSnippetThumbnailType.isRequired,
  medium: YouTubeChannelProfileSnippetThumbnailType.isRequired,
  high: YouTubeChannelProfileSnippetThumbnailType.isRequired,
})

const YouTubeChannelProfileSnippet = PropTypes.shape({
  channelId: PropTypes.string.isRequired,
  channelTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  liveBroadcastContent: PropTypes.string.isRequired,
  publishTime: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  thumbnails: YouTubeChannelProfileSnippetThumbnailsType.isRequired,
  title: PropTypes.string.isRequired,
})

const YouTubeChannelProfile = PropTypes.shape({
  kind: PropTypes.string.isRequired,
  etag: PropTypes.string.isRequired,
  id: YouTubeChannelProfileIdType.isRequired,
  snippet: YouTubeChannelProfileSnippet.isRequired,
})

export {
  PodcastIdType,
  PodcastSnippetType,
  PodcastSnippetThumbnailType,
  PodcastSnippetThumbnailsType,
  PodcastType,
  PodcastsType,
  YouTubeChannelProfileIdType,
  YouTubeChannelProfileSnippetThumbnailsType,
  YouTubeChannelProfileSnippet,
  YouTubeChannelProfile,
}
