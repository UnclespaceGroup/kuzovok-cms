import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import ContainerSideMenu from 'containers/ContainerSideMenu/ContainerSideMenu'
import { Route, Switch } from 'react-router'
import AddWorkPage from 'pages/Work/AddWorkPage'
import {
  ADD_WORK_PAGE,
  ADD_PAPER_PAGE,
  ADD_REPORT_PAGE,
  ADD_SERVICE_PAGE,
  WORKS_PAGE,
  REPORTS_PAGE, SERVICES_PAGE, PAPERS_PAGE, PAGE_LOGIN, EDIT_PAGE, EDIT_MAIN_PAGE, ADD_ADVANTAGES_MAIN, PAGE_BANNERS
} from 'constants/routes'
import AddPaperPage from 'pages/Paper/AddPaperPage'
import AddReportPage from 'pages/Report/AddReportPage'
import AddServicePage from 'pages/Services/AddServicePage'
import ShowWorksPage from 'pages/Work/ShowWorksPage'
import ShowReportsPage from 'pages/Report/ShowReportsPage'
import ShowServicesPage from 'pages/Services/ShowServicesPage'
import ShowPaperPage from 'pages/Paper/ShowPaperPage'
import Login from 'pages/auth/Login'
import EditPage from 'pages/EditPage/EditPage'
import useUserStore from 'hooks/useUserStore'
import PageLogin from 'pages/PageLogin/PageLogin'
import EditMainPage from 'pages/EditMainPage/EditMainPage'
import AddAdvantagesMain from 'pages/AdvantagesMain/AddAdvantagesMain'
import PageBanners from 'pages/PageBanners/PageBanners'

const Routes = () => {
  const { initialization, user } = useUserStore()
  useEffect(() => {
    initialization()
  }, [])

  if (!user) return <PageLogin />
  return (
    <Row>
      <Col xs={2}>
        <ContainerSideMenu />
      </Col>
      <Col>
        <Switch>
          <Route component={EditMainPage} exact path={EDIT_MAIN_PAGE} />

          <Route component={AddAdvantagesMain} exact path={ADD_ADVANTAGES_MAIN} />
          <Route component={AddWorkPage} exact path={ADD_WORK_PAGE} />
          <Route component={AddPaperPage} exact path={ADD_PAPER_PAGE} />
          <Route component={AddReportPage} exact path={ADD_REPORT_PAGE} />
          <Route component={AddServicePage} exact path={ADD_SERVICE_PAGE} />

          <Route component={PageBanners} exact path={PAGE_BANNERS} />
          <Route component={ShowWorksPage} exact path={WORKS_PAGE} />
          <Route component={ShowReportsPage} exact path={REPORTS_PAGE} />
          <Route component={ShowServicesPage} exact path={SERVICES_PAGE} />
          <Route component={ShowPaperPage} exact path={PAPERS_PAGE} />

          <Route component={EditPage} exact path={EDIT_PAGE + ':id'} />
          <Route component={Login} exact path={PAGE_LOGIN} />
        </Switch>
      </Col>
    </Row>
  )
}
export default Routes