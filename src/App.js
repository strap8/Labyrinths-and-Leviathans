import React, { useEffect, memo, lazy, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "./store/provider"
import { Route, Switch, Redirect } from "react-router-dom"
import { About, Home, PrivacyPolicy, PodcastDetail } from "./views"
import { NavBar } from "./components"
import { RouteMap, RouterGoBack } from "./store/reducers/router/actions"
import { useAddToHomescreenPrompt } from "./components/AddToHomeScreen/prompt"
import { SetWindow } from "./store/reducers/Window/actions"

const Contact = lazy(() => import("./views/Contact"))
const PageNotFound = lazy(() => import("./views/PageNotFound"))

const { ABOUT, HOME, ROOT, CONTACT, PRIVACY_POLICY, PODCAST_DETAIL } = RouteMap

const mapStateToProps = ({}) => ({})

const mapDispatchToProps = {
  SetWindow,
}

const App = () => {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt()
  const handleResize = () => SetWindow()

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Fragment>
      <NavBar prompt={prompt} promptToInstall={promptToInstall} />
      <main className="App RouteOverlay">
        <Switch>
          <Route
            exact={true}
            strict={false}
            path={[ABOUT]}
            render={() => (
              <About prompt={prompt} promptToInstall={promptToInstall} />
            )}
          />
          <Route
            exact={true}
            strict={false}
            path={[ROOT, HOME]}
            render={() => (
              <Home prompt={prompt} promptToInstall={promptToInstall} />
            )}
          />
          <Route exact path={[CONTACT]} render={() => <Contact />} />
          <Route
            exact
            path={[PRIVACY_POLICY]}
            render={() => <PrivacyPolicy />}
          />
          <Route
            exact
            path={[PODCAST_DETAIL]}
            render={({
              match: {
                params: { videoId },
              },
            }) => <PodcastDetail videoId={videoId} />}
          />
          <Route render={() => <PageNotFound />} />
        </Switch>
      </main>
    </Fragment>
  )
}

App.propTypes = {
  SetWindow: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(App))
