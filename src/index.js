import "./css/index.css"
import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import rootReducer from "./store/reducers"
import { Router } from "react-router-dom"
import { history } from "./store/reducers/router/reducer"
import { LoadingScreen } from "./components"
import { ContextProvider } from "./store/provider/provider"
import * as serviceWorker from "./serviceWorker"
import ReactGA from "react-ga"

const PERSIST_STORE_KEY = "store"
const STORE = localStorage.getItem(PERSIST_STORE_KEY)

const initialProviderState = STORE ? JSON.parse(STORE) : undefined

// Initialize google analytics page view tracking
history.listen((location) => {
  const page = location.pathname

  // ReactGA.set({ dimension1: "test" })
  // ReactGA.pageview(page, { dimension1: "test" }) // Record a pageview for the given page

  ReactGA.set({ page }) // Update the user's current page
  ReactGA.pageview(page) // Record a pageview for the given page
})

ReactDOM.render(
  // <React.StrictMode>
  <ContextProvider
    rootReducer={rootReducer}
    initialState={initialProviderState}
    persistKey={PERSIST_STORE_KEY}
  >
    <Suspense fallback={<LoadingScreen />}>
      <Router history={history}>
        <App />
      </Router>
    </Suspense>
  </ContextProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
)

const { NODE_ENV, REACT_APP_GOOGLE_TRACKING_ID } = process.env

const inDevelopmentMode = NODE_ENV === "development"

// Doesn't get called in development since there is no service worker
// inDevelopmentMode && store.dispatch(GetAppVersion())

serviceWorker.register(serviceWorker.serviceWorkerConfig())
