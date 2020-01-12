import React, { useEffect, useState } from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import { ADD_SERVICE_PAGE } from 'constants/routes'
import moment from 'moment'
import CardLink from '../../components/CardLink/CardLink'
import AddCard from '../../components/AddCard/AddCard'
import Padding from '../../components/Padding/Padding'
import { deleteServices, getServices } from '../../axiosFetch/service'
import useUserStore from '../../hooks/useUserStore'
import { getImageStorageUrl } from 'services/getImageStorageUrl'

const ShowServicesPage = () => {
  const { accessString } = useUserStore()

  const [mainItems, setMainItems] = useState([])
  const [items, setItems] = useState([])
  useEffect(() => {
    getServices()
      .then(data => {
        setMainItems(data.filter(item => !item.parentId))
        setItems(data.filter(item => item.parentId))
      })
  }, [])
  const deleteItem = (id) => {
    const a = window.confirm('Точно удалить')
    if (a) {
      deleteServices({id, accessString})
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
      <h1>Просмотр услуг</h1>
      <Padding value={24} />
      <h2>Основные услуги</h2>
      <Padding value={24} />
      <Row>
        {
          mainItems.map((item, key) => (
            <Col xs={4} key={key}>
              <Card style={{ width: '22rem', marginBottom: '2rem' }} >
                <Card.Img variant="top" src={getImageStorageUrl(item.banner)} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {moment(item.date).format('LL')}
                  </Card.Text>
                </Card.Body>
                <CardLink to={{ pathname: ADD_SERVICE_PAGE, state: { ...item } }}>Изменить</CardLink>
                <CardLink to={{ pathname: ADD_SERVICE_PAGE, state: { parentId: item.id } }}>Добавить подкатегорию</CardLink>
                <Card.Footer>
                  <Button variant={'danger'} onClick={() => deleteItem(item.id)}>Удалить</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        }
        <Col xs={4}>
          <Card>
            <AddCard path={ADD_SERVICE_PAGE} />
          </Card>
        </Col>
      </Row>
      <Padding value={60} />
      <hr />
      <h2>Подкатегории услуг</h2>
      <Padding value={24} />
      <Row>
        {
          items.map((item, key) => (
            <Col xs={4} key={key}>
              <Card style={{ width: '22rem', marginBottom: '2rem' }} >
                <Card.Img variant="top" src={item.banner} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {moment(item.date).format('LL')}
                  </Card.Text>
                </Card.Body>
                <CardLink to={{ pathname: ADD_SERVICE_PAGE, state: { ...item } }}>Изменить</CardLink>
                <CardLink to={{ pathname: ADD_SERVICE_PAGE, state: { parentId: item.id } }}>Добавить подкатегорию</CardLink>
                <Card.Footer>
                  <Button variant={'danger'} onClick={() => deleteItem(item.id)}>Удалить</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        }
      </Row>
      <Padding value={60} />
    </Container>
  )
}
export default ShowServicesPage
