import { AtlasActionTypes } from "./types"
import axios from "axios"

const moveCreature = (id, position) => ({
  type: AtlasActionTypes.MOVE_CREATURE,
  id,
  payload: position
})

const toggleSelectCreature = (id) => ({
  type: AtlasActionTypes.SELECT_CREATURE,
  id
})

export { moveCreature, toggleSelectCreature }
