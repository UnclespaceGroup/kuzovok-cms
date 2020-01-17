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
    name: 'title'
  },
  {
    type: 'text',
    label: 'Слаг',
    placeholder: 'pokraska-avto',
    name: 'slug',
    text: 'Будет отображаться в поисковом запросе (английскими буквами, без пробелов)'
  },
  {
    type: 'textarea',
    label: 'Аннотация',
    name: 'annotation',
    placeholder: 'Аннотация',
    text: 'Отображается в баннере и на карточке'
  },
  {
    type: 'editor',
    label: 'Описание',
    name: 'text'
  },
  {
    type: 'checkbox',
    label: 'Основная',
    name: 'isMain'
  },
  {
    type: 'checkbox',
    label: 'Баннер',
    name: 'isBanner'
  }
]
