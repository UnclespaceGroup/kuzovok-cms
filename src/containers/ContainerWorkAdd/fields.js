import {
  FIELD_ANNOTATION,
  FIELD_BANNER,
  FIELD_STATUS, FIELD_TAGS, FIELD_TEXT,
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
    name: FIELD_TITLE
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
    placeholder: 'Аннотация'
  },
  {
    type: 'textarea',
    label: 'Теги',
    name: FIELD_TAGS,
    placeholder: '#тег'
  },
  {
    type: 'editor',
    label: 'Описание',
    name: FIELD_TEXT
  }
]
