import React from "react"
import { Switch, Route } from "react-router-dom"

import "./App.css"

import Homepage from "./pages/hompage/homepage.component"
import ShopPage from "./pages/shop/shop.component"
import Header from "./components/header/header.component"
import Authentication from "./pages/authentication/authentication"

import { auth } from "./firebase/firebase.utils"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user })

      console.log(user)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/authentication" component={Authentication} />
        </Switch>
      </div>
    )
  }
}

export default App
