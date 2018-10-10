import React , { Fragment } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { withLocalize } from 'react-localize-redux'
import { Route, Switch } from 'react-router-dom'

// Import Translations
import globalTranslations from '../translations/globalTranslations.json'
// Auth
import PrivateRoute from './common/PrivateRoute'
// Components
import Nav from './layout/Nav'
import Landing from './layout/Landing'
import Footer from './layout/Footer'
import Login from './auth/Login'
import DashBoard from './dashboard/DashBoard'
// Styling
import '../styles/reset.css'
import '../styles/global.css'
import '../styles/nav.css'
import '../styles/footer.css'
import '../styles/auth.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Spanish", code: "es" }
      ],
      translation: globalTranslations,
      options: { renderToStaticMarkup }
    })
  }
  render() {
    return (
      <Fragment>
        <Nav />
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path='/login' component={Login}/>
          <PrivateRoute exact path='/dashboard' component={DashBoard}/>
        </Switch>
        <Footer />
      </Fragment>
    )
  }
}

export default withLocalize(App)
