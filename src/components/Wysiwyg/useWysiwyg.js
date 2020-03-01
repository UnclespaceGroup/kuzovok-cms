import { BASE_URL } from 'constants/url'
const pathTemplate = '__path__'

const useWysiwyg = ({ children }) => {
  const text = typeof children === 'string' && children.replace(new RegExp(pathTemplate, 'g'), BASE_URL)

  return { text }
}
export default useWysiwyg
