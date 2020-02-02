import {
  SERVICES_PAGE,
  ADD_SERVICE_PAGE,
  ADD_WORK_PAGE,
  WORKS_PAGE,
  EDIT_MAIN_PAGE,
  PAGE_BANNERS, PAGE_SLIDES, PAGE_CONTACTS, ADD_STATION_PHOTOS
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
    title: 'Редактировать главную',
    items: [
      {
        title: 'Слайдер на главной',
        to: PAGE_SLIDES
      },
      {
        title: 'Блоки',
        to: EDIT_MAIN_PAGE
      },
    ]
  },
  {
    title: 'Прочее',
    items: [
      {
        title: 'Баннеры страниц',
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
