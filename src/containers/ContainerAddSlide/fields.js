import {
  FIELD_ANNOTATION,
  FIELD_TITLE
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
    name: FIELD_TITLE,
    text: 'Отображается в верхнем баннере, и на карточке в странице деталки'
  },
  {
    type: 'textarea',
    label: 'Аннотация',
    name: FIELD_ANNOTATION,
    placeholder: 'Аннотация',
    text: 'Отображается как текст на карточке, на деталке в верхнем баннере'
  }
]
