import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'
import {
  HOME_PAGE,
} from 'constants/routes'
import Header from './components/Header/Header'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { Container } from 'react-bootstrap'
import PageLogin from 'pages/PageLogin/PageLogin'

const store = configureStore()

function App () {
  return (
    <Provider store={store}>
      <Container fluid>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route component={MainPage} path={HOME_PAGE} />
            <Route component={PageLogin} path={'*'} />
          </Switch>
        </BrowserRouter>
      </Container>
    </Provider>
  )
}

export default App
