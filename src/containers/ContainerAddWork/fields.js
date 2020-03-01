import {
  STATUSES,
  WORKS_TYPES
} from 'constants/WORK_FIELDS_NAME'

export const fields = [
  {
    type: 'image',
    label: 'Изображение баннера',
    name: 'banner',
    typeName: 'mainBanner'
  },
  {
    type: 'text',
    label: 'Заголовок',
    placeholder: 'Заголовок',
    name: 'title',
    text: 'Отображается в верхнем баннере, и на карточке в странице деталки'
  },
  {
    type: 'select',
    label: 'Тип работы',
    name: 'type',
    options: WORKS_TYPES
  },
  {
    type: 'select',
    label: 'Статус',
    name: 'status',
    options: STATUSES
  },
  {
    type: 'textarea',
    label: 'Аннотация',
    name: 'annotation',
    placeholder: 'Аннотация',
    text: 'Отображается как текст на карточке, на деталке в верхнем баннере'
  },
  {
    type: 'editor',
    label: 'Описание',
    name: 'text',
    typeName: 'textImages'
  }
]
