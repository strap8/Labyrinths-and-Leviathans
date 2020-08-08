import { Atlas } from "./Atlas/reducer"
import { Alerts } from "./Alerts/reducer"
import { App } from "./App/reducer"
import { Window } from "./Window/reducer"
import { User } from "./User/reducer"

const rootReducer = {
  Atlas,
  Alerts,
  App,
  Window,
  User
}

export default rootReducer
