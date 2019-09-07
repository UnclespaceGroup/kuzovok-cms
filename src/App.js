import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={MainPage} exact path={'/'} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
