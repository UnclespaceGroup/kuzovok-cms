import {
  SERVICES_PAGE,
  ADD_SERVICE_PAGE,
  ADD_WORK_PAGE,
  WORKS_PAGE,
  EDIT_MAIN_PAGE,
  PAGE_BANNERS, PAGE_CONTACTS, ADD_STATION_PHOTOS, PAPERS_PAGE, ADD_PAPER_PAGE
} from 'constants/routes'

export const blocks = [
  {
    title: 'Главная',
    to: '/'
  },
  {
    title: 'Услуги',
    to: SERVICES_PAGE,
    items: [
      {
        title: 'Добавить ',
        to: ADD_SERVICE_PAGE
      },
      {
        title: 'Посмотреть',
        to: SERVICES_PAGE
      }
    ]
  },
  {
    title: 'Автомобили в ремонте',
    to: WORKS_PAGE,
    items: [
      {
        title: 'Добавить',
        to: ADD_WORK_PAGE
      },
      {
        title: 'Посмотреть',
        to: WORKS_PAGE
      }
    ]
  },
  {
    title: 'Статьи',
    to: PAPERS_PAGE,
    items: [
      {
        title: 'Добавить',
        to: ADD_PAPER_PAGE
      },
      {
        title: 'Посмотреть',
        to: PAPERS_PAGE
      }
    ]
  },
  {
    title: 'Прочее',
    items: [
      {
        title: 'Редактировать главную',
        to: EDIT_MAIN_PAGE
      },
      {
        title: 'Страницы',
        to: PAGE_BANNERS
      },
      {
        title: 'Контакты',
        to: PAGE_CONTACTS
      },
      {
        title: 'Фото станции',
        to: ADD_STATION_PHOTOS
      }
    ]
  }
]
