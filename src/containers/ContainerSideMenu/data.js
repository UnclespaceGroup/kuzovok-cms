import {
  SERVICES_PAGE,
  ADD_SERVICE_PAGE,
  ADD_WORK_PAGE,
  WORKS_PAGE,
  EDIT_MAIN_PAGE,
  PAGE_BANNERS, PAGE_SLIDES, PAGE_CONTACTS
} from 'constants/routes'

export const blocks = [
  {
    title: 'Страницы',
    items: [
      {
        title: 'Главная',
        to: EDIT_MAIN_PAGE
      },
      {
        title: 'Слайдер на главной',
        to: PAGE_SLIDES
      },
      {
        title: 'Баннеры страниц',
        to: PAGE_BANNERS
      },
      {
        title: 'Контакты',
        to: PAGE_CONTACTS
      }
    ]
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
  }
]
