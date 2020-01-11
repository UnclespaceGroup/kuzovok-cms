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

const store = configureStore()

function App () {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route component={MainPage} path={HOME_PAGE} />
          <Route component={MainPage} path={'*'} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
