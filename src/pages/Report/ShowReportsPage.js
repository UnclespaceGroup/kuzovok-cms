import React, { useEffect, useState } from 'react'
import { Table, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ADD_REPORT_PAGE } from '../../constants/ROUTES'
import moment from 'moment'
import { deleteReport, getReports } from '../../axios/report'
import { withRouter } from 'react-router'

const ShowReportsPage = ({ location }) => {
  const [ items, setItems ] = useState([])
  const parentId = location.state.parentId
  useEffect(() => {
    getReports({ parentId })
      .then(data => {
        console.log(data)
        Array.isArray(data) && setItems(data)
      })
  }, [parentId])
  const deleteItem = (id) => {
    const a = window.confirm('Точно удалить')
    if (a) {
      deleteReport(id)
        .then(() => {
          const _items = Array.isArray(items) ? items.filter(item => item.id !== id) : []
          setItems(_items)
          window.alert('Успешно')
        })
        .catch(e => {
          console.log(e)
          window.alert('Не удалось')
        })
    }
  }
  return (
    <Container>
      <h1>Отчеты</h1>
      <Table>
        <tbody>
        {
          items.map((item, key) => (
            <tr key={key}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{moment(item.date).format('LL')}</td>
              <td><Button variant={'primary'} ><Link to={{pathname: ADD_REPORT_PAGE, state: { ...item}}}>Изменить</Link></Button></td>
              <td><Button variant={'danger'} onClick={() => deleteItem(item.id)}>Удалить</Button></td>
            </tr>
          ))
        }
        </tbody>
      </Table>
      <Link className={'btn btn-primary'} to={{pathname: ADD_REPORT_PAGE, state: { parentId }}}>Добавить</Link>
    </Container>
  )
}
export default withRouter(ShowReportsPage)
