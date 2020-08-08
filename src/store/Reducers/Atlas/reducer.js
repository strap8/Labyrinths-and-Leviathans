import { AtlasActionTypes } from "./types"
import { mergePodcasts, handleFilterPodcasts } from "./utils"
import defaultSprite from "../../../images/Sprites/human.png"

const DEFAULT_STATE_ATLAS = {
  World: {
    GameMap: {},
    Creatures: [
      {
        id: 1,
        position: [0, 0],
        url: defaultSprite,
        width: 40,
        height: 40,
        selected: true
      }
    ]
  }
}

const Atlas = (state = DEFAULT_STATE_ATLAS, action) => {
  const { type, id, payload, search } = action

  switch (type) {
    case AtlasActionTypes.MOVE_CREATURE:
      return {
        ...state,
        World: {
          ...state.World,
          Creatures: state.World.Creatures.map((c) =>
            c.id === id ? { ...c, position: payload } : c
          )
        }
      }

    case AtlasActionTypes.SELECT_CREATURE:
      return {
        ...state,
        World: {
          ...state.World,
          Creatures: state.World.Creatures.map((c) =>
            c.id === id ? { ...c, selected: !c.selected } : c
          )
        }
      }

    default:
      return state
  }
}

export { DEFAULT_STATE_ATLAS, Atlas }
