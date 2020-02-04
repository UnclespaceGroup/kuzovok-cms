import React from 'react'
import 'App.scss'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Routes from 'pages/Routes'
import {
  HOME_PAGE
} from 'constants/routes'
import Header from './components/Header/Header'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { Container } from 'react-bootstrap'
import MainPage from 'pages/MainPage/MainPage'

const store = configureStore()

function App () {
  return (
    <Provider store={store}>
      <Container fluid>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route component={Routes} path={HOME_PAGE} />

            <Route exact component={MainPage} />
          </Switch>
        </BrowserRouter>
      </Container>
    </Provider>
  )
}

export default App
