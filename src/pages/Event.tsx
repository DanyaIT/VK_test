import Layout from 'antd/es/layout/layout'
import React, { FC, useState, useEffect } from 'react'
import CalendarEvent from '../components/CalendarEvent'
import { Button, Modal, Row } from 'antd'
import EventForm from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IEvent } from '../models/IEvent'

const Event: FC = () => {

  const [modalVisable, setModalVisable] = useState(false)
  const {fetchGuests, createEvent, fetchEvents} = useActions();
  const {guests, events} = useTypedSelector(state => state.event)
  const {user} = useTypedSelector(state => state.auth)

  useEffect(() => {
    fetchGuests()
    fetchEvents(user.username)
  },[])

  const addNewEvent = (event:IEvent)=> {
    setModalVisable(false)
    createEvent(event)
  }

  return (
    <Layout>
      <CalendarEvent events={events} /> 
      <Row justify={'center'}>
        <Button onClick={() => setModalVisable(true)}>
          Бронирование переговорной
        </Button>
        <Modal 
        title = 'Добавить событие'
        open = {modalVisable}
        onCancel={() => setModalVisable(false)}
        footer = {null}
        >
        <EventForm guests={guests} events={events} submit={addNewEvent}/>
        </Modal>
      </Row>
    </Layout>
  )
}

export default Event

