import React from 'react'
import './App.css'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ShowWorksPage from './pages/ShowWorksPage'
import {
  ADD_WORK_PAGE,
  HOME_PAGE,
  WORKS_PAGE,
  ADD_REPORT_PAGE,
  REPORTS_PAGE,
  ADD_SERVICE_PAGE,
  SERVICES_PAGE
} from './constants/ROUTES'
import Header from './components/Header/Header'
import AddWorkPage from './pages/AddWorkPage'
import AddReportPage from './pages/AddReportPage'
import ShowReportsPage from './pages/ShowReportsPage'
import AddServicePage from './pages/AddServicePage'
import ShowServicesPage from './pages/ShowServicesPage'

function App () {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route component={MainPage} exact path={HOME_PAGE} />
        <Route component={AddWorkPage} exact path={ADD_WORK_PAGE} />
        <Route component={AddReportPage} exact path={ADD_REPORT_PAGE} />
        <Route component={AddServicePage} exact path={ADD_SERVICE_PAGE} />
        <Route component={ShowWorksPage} exact path={WORKS_PAGE} />
        <Route component={ShowReportsPage} exact path={REPORTS_PAGE} />
        <Route component={ShowServicesPage} exact path={SERVICES_PAGE} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
