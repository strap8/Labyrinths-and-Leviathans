import { objectToArray, stringMatch } from "../../../utils"

const mergePodcasts = (stateItems, newItems) => {
  // Order matters. You want to merge the reduxData into the newData
  const allPodcasts = stateItems.concat(newItems)
  let mergeMap = {}

  for (let i = 0, { length } = allPodcasts; i < length; i++) {
    const podcast = allPodcasts[i]
    const {
      id: { videoId },
    } = podcast

    if (!mergeMap[videoId]) {
      mergeMap[videoId] = podcast
    } else {
      // Merge
      mergeMap[videoId] = {
        ...mergeMap[videoId],
        ...podcast,
        snippet: { ...mergeMap[videoId].snippet, ...podcast.snippet },
      }
    }
  }

  return objectToArray(mergeMap)
}

const handleFilterPodcasts = (podcasts, search) => {
  if (!search) return { items: podcasts, filteredItems: [] }
  let cachedFilteredEntries = []

  const tagMatch = (tags) =>
    (tags || []).some((tag) => stringMatch(tag, search))

  const filteredEntries = podcasts.filter((item) => {
    const {
      kind,
      etag,
      id: { kind: idKind, videoId, detailId },
      snippet: {
        publishedAt,
        channelId,
        title,
        description,
        thumbnails,
        channelTitle,
        tags,
        categoryId,
        liveBroadcastContent,
        localized,
        defaultAudioLanguage,
        publishTime,
      },
    } = item

    if (
      stringMatch(kind, search) ||
      stringMatch(idKind, search) ||
      stringMatch(detailId || videoId, search) ||
      tagMatch(tags) ||
      stringMatch(title, search) ||
      stringMatch(publishedAt, search) ||
      stringMatch(publishTime, search) ||
      stringMatch(description, search)
    ) {
      return true
    } else {
      cachedFilteredEntries.push(item)
      return false
    }
  })

  return {
    filteredItems: cachedFilteredEntries,
    items: filteredEntries,
  }
}

export { mergePodcasts, handleFilterPodcasts }
