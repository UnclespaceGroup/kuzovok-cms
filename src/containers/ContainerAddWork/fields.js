import {
  FIELD_ANNOTATION,
  FIELD_BANNER,
  FIELD_STATUS, FIELD_TEXT,
  FIELD_TITLE,
  FIELD_TYPE,
  STATUSES,
  WORKS_TYPES
} from 'constants/WORK_FIELDS_NAME'

export const fields = [
  {
    type: 'image',
    label: 'Изображение баннера',
    name: FIELD_BANNER,
    typeName: 'mainBanner'
  },
  {
    type: 'text',
    label: 'Заголовок',
    placeholder: 'Заголовок',
    name: FIELD_TITLE,
    text: 'Отображается в верхнем баннере, и на карточке в странице деталки'
  },
  {
    type: 'select',
    label: 'Тип работы',
    name: FIELD_TYPE,
    options: WORKS_TYPES
  },
  {
    type: 'select',
    label: 'Статус',
    name: FIELD_STATUS,
    options: STATUSES
  },
  {
    type: 'textarea',
    label: 'Аннотация',
    name: FIELD_ANNOTATION,
    placeholder: 'Аннотация',
    text: 'Отображается как текст на карточке, на деталке в верхнем баннере'
  },
  {
    type: 'editor',
    label: 'Описание',
    name: FIELD_TEXT,
    typeName: 'textImages'
  }
]
