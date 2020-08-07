import { AxiosGoogle } from "./"

const { REACT_APP_GOOGLE_API } = process.env

const GetYouTubeChannel = (
  options = {
    channelId: "UCaO6VoaYJv4kS-TQO_M-N_g",
    part: "snippet,id",
    orderBy: "date",
    pageCount: 50,
    previousPageToken: null,
    nextPageToken: null,
  }
) => {
  const {
    channelId,
    part,
    orderBy,
    pageCount,
    previousPageToken,
    nextPageToken,
  } = options

  let url = ["search?"]
  if (REACT_APP_GOOGLE_API) url.push(`key=${REACT_APP_GOOGLE_API}`)
  if (channelId) url.push(`channelId=${channelId}`)
  if (part) url.push(`part=${part}`)
  if (orderBy) url.push(`order=${orderBy}`)
  if (pageCount) url.push(`maxResults=${pageCount}`)
  if (previousPageToken) url.push(`pageToken=${previousPageToken}`)
  else if (nextPageToken) url.push(`pageToken=${nextPageToken}`)

  const googleSearchChannelUrl = url.join("&")

  return AxiosGoogle()
    .get(googleSearchChannelUrl)
    .then(({ data }) => data)
    .catch(({ message }) => console.log(message))
}

const GetYouTubeVideo = (options = { id: null, part: "snippet,id" }) => {
  const { id, part } = options

  let url = ["videos?"]
  if (REACT_APP_GOOGLE_API) url.push(`key=${REACT_APP_GOOGLE_API}`)
  if (id) url.push(`id=${id}`)
  if (part) url.push(`part=${part}`)

  const googleSearchChannelUrl = url.join("&")

  return AxiosGoogle()
    .get(googleSearchChannelUrl)
    .then(({ data }) => data)
    .catch(({ message }) => console.log(message))
}

export { GetYouTubeChannel, GetYouTubeVideo }
