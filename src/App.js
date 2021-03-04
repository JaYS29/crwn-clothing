import React from "react"
import { Switch, Route } from "react-router-dom"
import { connect } from "react-redux"

import "./App.css"

import Homepage from "./pages/hompage/homepage.component"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"
import Authentication from "./pages/authentication/authentication"

import { setCurrentUser } from "./redux/user/user.actions"

import { auth, createUserProfileDocument } from "./firebase/firebase.utils"

class App extends React.Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      } else {
        setCurrentUser(userAuth)
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/authentication" component={Authentication} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispatchToProps)(App)
