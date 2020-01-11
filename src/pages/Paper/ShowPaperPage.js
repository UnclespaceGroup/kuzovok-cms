import React, { useEffect, useState } from 'react'
import { Button, Container, Card, Row, Col } from 'react-bootstrap'
import { ADD_PAPER_PAGE } from 'constants/routes'
import moment from 'moment'
import CardLink from '../../components/CardLink/CardLink'
import AddCard from '../../components/AddCard/AddCard'
import Padding from '../../components/Padding/Padding'
import useUserStore from '../../hooks/useUserStore'
import { getPapers, deletePaper } from '../../axiosFetch/paper'

const ShowPaperPage = () => {
  const { accessString } = useUserStore()
  const [items, setItems] = useState([])
  useEffect(() => {
    getPapers({ accessString })
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
      deletePaper({ id, accessString })
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
                <Card.Img variant="top" src={item.banner} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    {moment(item.date).format('LL')}
                  </Card.Text>
                </Card.Body>
                <CardLink to={{ pathname: ADD_PAPER_PAGE, state: { ...item } }}>Изменить</CardLink>
                <Card.Footer>
                  <Button variant={'danger'} onClick={() => deleteItem(item.id)}>Удалить</Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        }
        <Col xs={4}>
          <Card>
            <AddCard path={ADD_PAPER_PAGE} />
          </Card>
        </Col>
      </Row>
      <Padding value={60} />
    </Container>
  )
}
export default ShowPaperPage
