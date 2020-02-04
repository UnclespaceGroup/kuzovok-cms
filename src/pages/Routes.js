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
  REPORTS_PAGE,
  SERVICES_PAGE,
  PAPERS_PAGE,
  PAGE_LOGIN,
  EDIT_PAGE,
  EDIT_MAIN_PAGE,
  ADD_ADVANTAGES_MAIN,
  PAGE_BANNERS,
  ADD_MAIN_PAGE_CARD, PAGE_SLIDES, ADD_SLIDE, PAGE_CONTACTS, ADD_STATION_PHOTOS, HOME_DOCUMENT
} from 'constants/routes'
import AddPaperPage from 'pages/Paper/AddPaperPage'
import AddReportPage from 'pages/Report/AddReportPage'
import AddServicePage from 'pages/Services/AddServicePage'
import Paper from 'pages/Paper/Paper'
import EditPage from 'pages/EditPage/EditPage'
import useUserStore from 'hooks/useUserStore'
import PageLogin from 'pages/PageLogin/PageLogin'
import EditMainPage from 'pages/EditMainPage/EditMainPage'
import AddAdvantagesMain from 'pages/AdvantagesMain/AddAdvantagesMain'
import PageBanners from 'pages/PageBanners/PageBanners'
import Reports from 'pages/Report/Reports'
import Works from 'pages/Work/Works'
import Services from 'pages/Services/Services'
import AddMainPageCards from 'pages/MainPageCards/AddMainPageCards'
import Slides from 'pages/Slides/Slides'
import AddSlidePage from 'pages/Slides/AddSlidePage'
import Padding from 'components/Padding/Padding'
import css from './routes.module.scss'
import MainPage from 'pages/MainPage/MainPage'
import Contacts from 'pages/Contacts/Contacts'
import AddStationPhotos from 'pages/StationPhotos/AddStationPhotos'
import PageDocument from 'pages/PageDocument/PageDocument'

const Routes = () => {
  const { initialization, user } = useUserStore()
  useEffect(() => {
    initialization()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) return <PageLogin />
  return (
    <Row>
      <Col xs={2}>
        <Padding value={24} />
        <ContainerSideMenu />
      </Col>
      <Col xs={9}>
        <Padding value={24} />
        <div className={css.content}>
          <Switch>
            <Route component={PageDocument} path={HOME_DOCUMENT} exact />

            <Route component={EditMainPage} exact path={EDIT_MAIN_PAGE} />

            <Route component={AddAdvantagesMain} exact path={ADD_ADVANTAGES_MAIN} />
            <Route component={AddMainPageCards} exact path={ADD_MAIN_PAGE_CARD} />
            <Route component={AddWorkPage} exact path={ADD_WORK_PAGE} />
            <Route component={AddPaperPage} exact path={ADD_PAPER_PAGE} />
            <Route component={AddReportPage} exact path={ADD_REPORT_PAGE} />
            <Route component={AddServicePage} exact path={ADD_SERVICE_PAGE} />
            <Route component={AddStationPhotos} path={ADD_STATION_PHOTOS} />
            <Route component={AddSlidePage} exact path={ADD_SLIDE} />

            <Route component={PageBanners} exact path={PAGE_BANNERS} />
            <Route component={Works} exact path={WORKS_PAGE} />
            <Route component={Reports} exact path={REPORTS_PAGE + ':parentId'} />
            <Route component={Services} exact path={SERVICES_PAGE} />
            <Route component={Slides} exact path={PAGE_SLIDES} />
            <Route component={Paper} exact path={PAPERS_PAGE} />

            <Route component={EditPage} exact path={EDIT_PAGE + ':id'} />
            <Route component={PageLogin} exact path={PAGE_LOGIN} />

            <Route component={Contacts} path={PAGE_CONTACTS} />

            <Route component={MainPage} path={'*'} />
          </Switch>
        </div>
        <Padding value={120} />
      </Col>
    </Row>
  )
}
export default Routes
