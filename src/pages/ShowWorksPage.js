import React, { useEffect, useState } from 'react'
import { deleteWork, getWorks } from '../axios'
import { Table, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ADD_WORK_PAGE } from '../constants/ROUTES'

const ShowWorksPage = () => {
  const [ items, setItems ] = useState([])
  useEffect(() => {
    getWorks()
      .then(data => {
        Array.isArray(data) && setItems(data)
      })
  }, [])
  const deleteItem = (id) => {
    const a = window.confirm('Точно удалить')
    if (a) {
      deleteWork(id)
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
      <Table>
        <tbody>
        {
          items.map((item, key) => (
            <tr key={key}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.text}</td>
              <td>{item.date}</td>
              <td>{item.annotation}</td>
              <td>{item.mainBannerImage}</td>
              <td><Button variant={'primary'} ><Link to={{pathname: ADD_WORK_PAGE, state: { ...item}}}>Изменить</Link></Button></td>
              <td><Button variant={'danger'} onClick={() => deleteItem(item.id)}>Удалить</Button></td>
            </tr>
          ))
        }
        </tbody>
      </Table>
    </Container>
  )
}
export default ShowWorksPage
