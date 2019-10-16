import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ShowWorksPage from './pages/ShowWorksPage'
import { ADD_WORK_PAGE, HOME_PAGE, WORKS_PAGE } from './constants/ROUTES'
import Header from './components/Header/Header'
import AddWorkPage from './pages/AddWorkPage'

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route component={MainPage} exact path={HOME_PAGE} />
        <Route component={AddWorkPage} exact path={ADD_WORK_PAGE} />
        <Route component={ShowWorksPage} exact path={WORKS_PAGE} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
