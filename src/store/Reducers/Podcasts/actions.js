import { PodcastActionTypes } from "./types"
import axios from "axios"
import { GetYouTubeChannel, GetYouTubeVideo } from "../../Actions/YouTube"

const DEFAULT_OPTIONS = {
  channelId: "UCaO6VoaYJv4kS-TQO_M-N_g",
  part: "snippet,id",
  orderBy: "date",
  pageCount: 50,
  previousPageToken: null,
  nextPageToken: null,
}

const ReceivePodcasts = (payload) => ({
  type: PodcastActionTypes.RECEIVE_PODCASTS,
  payload,
})

const ReceiveYouTubeChannelProfile = (payload) => ({
  type: PodcastActionTypes.RECEIVE_PODCAST_YOUTUBE_CHANNEL_PROFILE,
  payload,
})

const GetPodcasts = (nextPageToken = null) => async (dispatch) => {
  const options = { ...DEFAULT_OPTIONS, nextPageToken }

  return await GetYouTubeChannel(options)
    .then(
      ({
        etag,
        items: receivedItems,
        kind,
        prevPageToken,
        nextPageToken,
        pageInfo: { totalResults, resultsPerPage },
        regionCode,
      }) => {
        const items = receivedItems.filter((item) => {
          if (!item.id.videoId) {
            dispatch(ReceiveYouTubeChannelProfile(item))
            return false
          } else {
            return true
          }
        })

        const payload = {
          totalResults,
          resultsPerPage,
          prevPageToken,
          nextPageToken,
          items,
        }
        dispatch(ReceivePodcasts(payload))
        return payload
      }
    )
    .catch((e) => console.log(e))
}

const GetPodcastDetail = (id, part = "snippet,id") => async (dispatch) =>
  await GetYouTubeVideo({ id, part })
    .then(
      ({
        etag,
        items,
        kind,
        pageInfo: { totalResults, resultsPerPage },
        regionCode,
      }) => {
        const payload = {
          items: items.map((podcast) => ({
            ...podcast,
            id: {
              kind: podcast.kind,
              videoId: id,
              detailId: podcast.id,
            },
          })),
        }
        dispatch(ReceivePodcasts(payload))
        return payload
      }
    )
    .catch((e) => console.log(e))

const SearchPodcasts = (search) => ({
  type: PodcastActionTypes.SEARCH_PODCASTS,
  search,
})

const ResetSearchPodcasts = () => (dispatch) => dispatch(SearchPodcasts(""))

export { GetPodcasts, GetPodcastDetail, SearchPodcasts, ResetSearchPodcasts }
