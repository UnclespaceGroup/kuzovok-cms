import {
  FIELD_ANNOTATION,
  FIELD_BANNER,
  FIELD_TEXT,
  FIELD_TITLE,
} from '../../constants/WORK_FIELDS_NAME'

export const fields = [
  {
    type: 'text',
    label: 'Заголовок',
    placeholder: 'Заголовок',
    name: FIELD_TITLE
  },
  {
    type: 'imageList',
    label: 'Изображение баннера',
    name: FIELD_BANNER
  },
  {
    type: 'textarea',
    label: 'Аннотация',
    name: FIELD_ANNOTATION,
    placeholder: 'Аннотация'
  },
  {
    type: 'editor',
    label: 'Описание',
    name: FIELD_TEXT
  }
]
