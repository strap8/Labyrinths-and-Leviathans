import { PodcastActionTypes } from "./types"
import { mergePodcasts, handleFilterPodcasts } from "./utils"

const DEFAULT_STATE_PODCAST = {
  totalResults: null,
  resultsPerPage: null,
  prevPageToken: null,
  nextPageToken: null,
  items: [],
  filteredItems: [],
  lastUpdated: null,
  search: "",
  youTubeChannelProfile: {
    snippet: {
      thumbnails: {
        default: {},
        medium: {},
        high: {},
      },
    },
  },
}

const Podcasts = (state = DEFAULT_STATE_PODCAST, action) => {
  const { type, payload, search } = action

  switch (type) {
    case PodcastActionTypes.RECEIVE_PODCASTS:
      return {
        ...state,
        ...payload,
        ...handleFilterPodcasts(
          mergePodcasts(state.items, payload.items),
          state.search
        ),
        lastUpdated: new Date(),
      }

    case PodcastActionTypes.SEARCH_PODCASTS:
      return {
        ...state,
        ...handleFilterPodcasts(
          !payload
            ? state.items.concat(state.filteredItems)
            : mergePodcasts(state.items.concat(state.filteredItems), payload),
          search
        ),
        search,
      }

    case PodcastActionTypes.RECEIVE_PODCAST_YOUTUBE_CHANNEL_PROFILE:
      return { ...state, youTubeChannelProfile: payload }

    default:
      return state
  }
}

export { DEFAULT_STATE_PODCAST, Podcasts }
