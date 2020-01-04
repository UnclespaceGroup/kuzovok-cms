import React, { useState } from 'react'
import { Form as FinalForm } from 'react-final-form'
import { Container, Form, Button } from 'react-bootstrap'
import FormConstructor from '../../components/FormConstructor/FormConstructor'
import SectionStatus from '../../components/SectionStatus/SectionStatus'
import Padding from '../../components/Padding/Padding'
import { FAIL } from '../../constants/STATUSES'
import { withRouter } from 'react-router'
import arrayMutators from 'final-form-arrays'
import useUserStore from '../../hooks/useUserStore'
import { fields } from './fields'
import {
  FORM_ADD_PAPER,
} from '../../constants/WORK_FIELDS_NAME'
import { submitPaper } from '../../axiosFetch/paper'

const AddPaperPage = ({ location, history }) => {
  const { accessString } = useUserStore()
  const prevData = location.state || {}
  const [status, setStatus] = useState(null)
  const [pending, setPending] = useState(false)

  const submit = data => {
    setPending(true)
    setStatus(null)
    submitPaper({ data, id: prevData.id, accessString })
      .then(res => {
        setStatus(res)
        setTimeout(() => {
          history.goBack()
        }, 1000)
        setPending(false)
      })
      .catch(e => {
        console.log(e)
        setStatus(FAIL)
        setPending(false)
      })
  }
  return (
    <Container style={{ marginTop: '5vh', minHeight: '120vh' }}>
      <FinalForm
        form={FORM_ADD_PAPER}
        mutators={arrayMutators}
        onSubmit={submit}
        initialValues={prevData}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <h2>Форма добавления статьи</h2>
            <FormConstructor scheme={fields} />
            <Button disabled={pending} type="submit">Submit</Button>
          </Form>
        )}
      />
      <Padding value={20} />
      <SectionStatus status={status} />
    </Container>
  )
}
export default withRouter(AddPaperPage)
