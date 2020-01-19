import React, { useEffect, useState } from 'react'
import { deleteWork, getWorks } from '../../axiosFetch/work'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import { ADD_REPORT_PAGE, ADD_WORK_PAGE, REPORTS_PAGE } from 'constants/routes'
import moment from 'moment'
import CardLink from '../../components/CardLink/CardLink'
import AddCard from '../../components/AddCard/AddCard'
import Padding from '../../components/Padding/Padding'
import useUserStore from '../../hooks/useUserStore'
import { getImageStorageUrl } from 'services/getImageStorageUrl'

const ShowWorksPage = () => {
  const { accessString } = useUserStore()
  const [items, setItems] = useState([])
  useEffect(() => {
    getWorks({ accessString })
      .then(data => {
        Array.isArray(data) && setItems(data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [accessString])
  const deleteItem = (id) => {
    const a = window.confirm('Точно удалить')
    if (a) {
      deleteWork({ id, accessString })
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
      <Padding value={60} />
      <h1>Просмотр работ</h1>
      <Padding value={24} />
      <Row>
        {
          items.map((item, key) => (
            <Col xs={4} key={key}>
              <Card style={{ width: '22rem', marginBottom: '2rem' }} >
                <Card.Img variant="top" src={getImageStorageUrl(item.banner)} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {moment(item.date).format('LL')}
                  </Card.Text>
                </Card.Body>
                <CardLink to={{ pathname: ADD_WORK_PAGE, state: { ...item } }}>Изменить</CardLink>
                <CardLink
                  to={{
                    pathname: ADD_REPORT_PAGE,
                    state: {
                      parentId: item.id,
                      parentTitle: item.title
                    } }}>Добавить отчет</CardLink>
                <CardLink to={REPORTS_PAGE + item.id}>Просмотреть отчеты</CardLink>
                <Card.Footer>
                  <Button variant={'danger'} onClick={() => deleteItem(item.id)}>Удалить</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        }
        <Col xs={4}>
          <Card>
            <AddCard path={ADD_WORK_PAGE} />
          </Card>
        </Col>
      </Row>
      {/*<Table>*/}
      {/*  <tbody>*/}
      {/*  {*/}
      {/*    items.map((item, key) => (*/}
      {/*      <tr key={key}>*/}
      {/*        <td>{item.id}</td>*/}
      {/*        <td>{item.title}</td>*/}
      {/*        <td>{moment(item.date).format('LL')}</td>*/}
      {/*        <td><Button variant={'primary'}><Link to={{ pathname: ADD_WORK_PAGE, state: { ...item } }}>Изменить</Link></Button>*/}
      {/*        </td>*/}
      {/*        <td><Button variant={'primary'}><Link to={{ pathname: ADD_REPORT_PAGE, state: { parentId: item.id } }}>Добавить*/}
      {/*          отчет</Link></Button></td>*/}
      {/*        <td><Button variant={'primary'}><Link to={{ pathname: REPORTS_PAGE, state: { parentId: item.id } }}>Просмотреть*/}
      {/*          отчеты</Link></Button></td>*/}
      {/*        <td><Button variant={'danger'} onClick={() => deleteItem(item.id)}>Удалить</Button></td>*/}
      {/*      </tr>*/}
      {/*    ))*/}
      {/*  }*/}
      {/*  </tbody>*/}
      {/*</Table>*/}
      <Padding value={60} />
    </Container>
  )
}
export default ShowWorksPage
