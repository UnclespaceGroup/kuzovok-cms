import React, { useEffect } from 'react'
import ContainerSideMenu from 'containers/ContainerSideMenu/ContainerSideMenu'
import { Route, Switch } from 'react-router'
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
import useUserStore from 'hooks/useUserStore'
import PageLogin from 'pages/PageLogin/PageLogin'
import EditMainPage from 'pages/EditMainPage/EditMainPage'
import Padding from 'components/Padding/Padding'
import css from './routes.module.scss'
import MainPage from 'pages/MainPage/MainPage'
import PageDocument from 'pages/PageDocument/PageDocument'
import ContainerAddAdvantagesMain from 'containers/ContainerAddAdvantagesMain/ContainerAddAdvantagesMain'
import ContainerAddMainPageCard from 'containers/ContainerAddMainPageCard/ContainerAddMainPageCard'
import ContainerAddWork from 'containers/ContainerAddWork/ContainerAddWork'
import ContainerAddPaper from 'containers/ContainerAddPaper/ContainerAddPaper'
import ContainerAddReport from 'containers/ContainerAddReport/ContainerAddReport'
import ContainerAddService from 'containers/ContainerAddService/ContainerAddService'
import ContainerAddStationPhotos from 'containers/ContainerAddStationPhotos/ContainerAddStationPhotos'
import ContainerAddSlide from 'containers/ContainerAddSlide/ContainerAddSlide'
import ContainerPageBanners from 'containers/ContainerPageBanners/ContainerPageBanners'
import ContainerEditWork from 'containers/ContainerEditWork/ContainerEditWork'
import ContainerEditReports from 'containers/ContainerEditReports/ContainerEditReports'
import ContainerEditServices from 'containers/ContainerEditServices/ContainerEditServices'
import ContainerEditSlides from 'containers/ContainerEditSlides/ContainerEditSlides'
import ContainerEditPapers from 'containers/ContainerEditPapers/ContainerEditPapers'
import ContainerEditPage from 'containers/ContainerEditPage/ContainerEditPage'
import ContainerEditContacts from 'containers/ContainerEditContacts/ContainerEditContacts'

const Routes = () => {
  const { initialization, user } = useUserStore()
  useEffect(() => {
    initialization()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!user) return <PageLogin />
  return (
    <div className={css.row}>
      <div className={css.side}>
        <Padding value={24} />
        <ContainerSideMenu />
      </div>
      <div className={css.content}>
        <Padding value={24} />
        <div className={css.content}>
          <Switch>
            <Route component={PageDocument} path={HOME_DOCUMENT} exact />

            <Route component={EditMainPage} exact path={EDIT_MAIN_PAGE} />

            <Route component={ContainerAddAdvantagesMain} exact path={ADD_ADVANTAGES_MAIN} />
            <Route component={ContainerAddMainPageCard} exact path={ADD_MAIN_PAGE_CARD} />
            <Route component={ContainerAddWork} exact path={ADD_WORK_PAGE} />
            <Route component={ContainerAddPaper} exact path={ADD_PAPER_PAGE} />
            <Route component={ContainerAddReport} exact path={ADD_REPORT_PAGE} />
            <Route component={ContainerAddService} exact path={ADD_SERVICE_PAGE} />
            <Route component={ContainerAddStationPhotos} path={ADD_STATION_PHOTOS} />
            <Route component={ContainerAddSlide} exact path={ADD_SLIDE} />

            <Route component={ContainerPageBanners} exact path={PAGE_BANNERS} />
            <Route component={ContainerEditWork} exact path={WORKS_PAGE} />
            <Route component={ContainerEditReports} exact path={REPORTS_PAGE + ':parentId'} />
            <Route component={ContainerEditServices} exact path={SERVICES_PAGE} />
            <Route component={ContainerEditSlides} exact path={PAGE_SLIDES} />
            <Route component={ContainerEditPapers} exact path={PAPERS_PAGE} />

            <Route component={ContainerEditPage} exact path={EDIT_PAGE + ':id'} />
            <Route component={PageLogin} exact path={PAGE_LOGIN} />

            <Route component={ContainerEditContacts} path={PAGE_CONTACTS} />

            <Route component={MainPage} path={'*'} />
          </Switch>
        </div>
        <Padding value={120} />
      </div>
    </div>
  )
}
export default Routes
