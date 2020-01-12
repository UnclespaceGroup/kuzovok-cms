import { SERVICES_PAGE, ADD_SERVICE_PAGE, ADD_WORK_PAGE, WORKS_PAGE, EDIT_PAGE } from 'constants/routes'

export const blocks = [
  {
    title: 'Страницы',
    items: [
      {
        title: 'Главная',
        to: EDIT_PAGE + 'main'
      },
      {
        title: 'Последние работы',
        to: EDIT_PAGE + 'last-works'
      },
      {
        title: 'Автомобили в ремонте',
        to: EDIT_PAGE + 'works'
      },
      {
        title: 'О нас',
        to: EDIT_PAGE + 'about'
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
