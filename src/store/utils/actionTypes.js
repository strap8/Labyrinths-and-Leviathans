/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */

const randomString = () =>
  Math.random().toString(36).substring(7).split("").join(".")

const ActionTypes = {
  INIT: `@@store/INIT${randomString()}`,
  REPLACE: `@@store/REPLACE${randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@store/PROBE_UNKNOWN_ACTION${randomString()}`,
}

export default ActionTypes
