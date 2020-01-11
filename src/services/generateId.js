import moment from 'moment'

export const generateId = (name) => {
  const date = moment().format('L')
  const time = moment().format('LTS')
  return name + '--' + date.replace(/\//g, '-') + '--' + time.replace(/ /g, '').replace(/:/g, '-')
}
