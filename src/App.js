import React, { useEffect, memo, lazy } from "react"
import PropTypes from "prop-types"
import { connect } from "./store/provider"
import { Route, Switch, Redirect } from "react-router-dom"
import { About, Home, PrivacyPolicy } from "./views"
import { NavBar } from "./components"
import { RouteMap, RouterGoBack } from "./store/reducers/router/actions"
import { useAddToHomescreenPrompt } from "./components/AddToHomeScreen/prompt"
import { SetWindow } from "./store/reducers/Window/actions"
import { getRandomInt } from "./utils"
import { changeTheme } from "./css/variables/colors"

const AlertNotifications = lazy(() =>
  new Promise((resolve) => setTimeout(resolve, getRandomInt(0, 1))).then(() =>
    import("./components/AlertNotifications")
  )
)

const Contact = lazy(() => import("./views/Contact"))
const PageNotFound = lazy(() => import("./views/PageNotFound"))

const { ABOUT, HOME, ROOT, CONTACT, PRIVACY_POLICY, PODCAST_DETAIL } = RouteMap

const mapStateToProps = ({
  User: {
    id,
    token,
    Settings: { dark_mode },
    is_superuser
  }
}) => ({
  userId: id,
  userToken: token,
  userIsSuperUser: is_superuser,
  userDarkMode: dark_mode
})

const mapDispatchToProps = {
  SetWindow
}

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
      <AlertNotifications />
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
          <Route render={() => <PageNotFound />} />
        </Switch>
      </div>
    </main>
  )
}

App.propTypes = {
  SetWindow: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(App))
