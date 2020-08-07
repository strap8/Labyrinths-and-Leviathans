import React, { useEffect, memo, lazy } from "react"
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

const mapStateToProps = ({
  User: {
    id,
    token,
    Settings: { dark_mode },
    is_superuser,
  },
}) => ({
  userId: id,
  userToken: token,
  userIsSuperUser: is_superuser,
  userDarkMode: dark_mode,
})

const mapDispatchToProps = {
  SetWindow,
}

const DARK_MODE_THEME = {
  "--primaryColor": "#29303b",
  "--primaryColorRGB": "41, 48, 59",
  "--secondaryColor": "white",
  "--tertiarycolor": "#bdc3c7",
  "--quaternaryColor": "rgb(21, 32, 43)",
  "--quinaryColor": "#1f2326",
}

const LIGHT_MODE_THEME = {
  "--primaryColor": "white",
  "--primaryColorRGB": "255, 255, 255",
  "--secondaryColor": "black",
  "--tertiarycolor": "rgba(0, 0, 0, 0.75)",
  "--quaternaryColor": "#dfe6e9",
  "--quinaryColor": "#bdc3c7",
}

const mapThemeProperties = (themeObject) => {
  let root = document.documentElement

  for (const [key, value] of Object.entries(themeObject)) {
    root.style.setProperty(key, value)
  }
}

const changeTheme = (darkMode) =>
  darkMode
    ? mapThemeProperties(DARK_MODE_THEME)
    : mapThemeProperties(LIGHT_MODE_THEME)

const App = ({ userDarkMode, SetWindow }) => {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt()
  const handleResize = () => {
    SetWindow()
  }

  useEffect(() => {
    changeTheme(userDarkMode)
  }, [userDarkMode])

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <main className={userDarkMode ? "DarkMode" : "LightMode"}>
      <NavBar prompt={prompt} promptToInstall={promptToInstall} />
      <div className="App RouteOverlay">
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
      </div>
    </main>
  )
}

App.propTypes = {
  SetWindow: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(App))
