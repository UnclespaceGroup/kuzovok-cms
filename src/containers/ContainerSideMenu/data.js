import { SERVICES_PAGE, ADD_SERVICE_PAGE, ADD_WORK_PAGE, WORKS_PAGE } from 'constants/routes'

export const blocks = [
  {
    title: 'Страницы',
    to: '/',
    items: [
      {
        title: 'Главная',
        to: '/'
      },
      {
        title: 'Услуги станции',
        to: '/'
      },
      {
        title: 'Автомобили в ремонте',
        to: '/'
      },
      {
        title: 'О нас',
        to: '/'
      }
    ]
  },
  {
    title: 'Услуги',
    to: SERVICES_PAGE,
    items: [
      {
        title: 'Добавить',
        to: ADD_SERVICE_PAGE
      },
      {
        title: 'Посмотреть',
        ti: SERVICES_PAGE
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
        ti: WORKS_PAGE
      }
    ]
  }
]
