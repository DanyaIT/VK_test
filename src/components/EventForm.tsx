import { Button, DatePicker, Descriptions, Form, FormInstance, Input, Row, Select, Space } from 'antd'
import React, { useEffect, FC, useState } from 'react'
import { rules } from './utils/rules'
import { IUser } from '../models/IUser'
import { IEvent } from '../models/IEvent'

import formatDate from './utils/date'
import { Moment } from 'moment'
import { Dayjs } from 'dayjs'
import { useTypedSelector } from '../hooks/useTypedSelector'


interface EventFormProps {
    events: IEvent[],
    guests: IUser[],
    submit: (event: IEvent) => void
}


const EventForm: FC<EventFormProps> = (props) => {
    const formRef = React.useRef<FormInstance>(null);
    
    const [event, setEvent] = useState<IEvent>({
        tower: '',
        meetingRoom: null,
        floor: null,
        author: '',
        guest: '',
        date: '',
        comment: ''
    } as IEvent)
    const { user } = useTypedSelector(state => state.auth)

    const initialState = {
        towers: ["A", "B"],
        floors: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27],
        meetingRooms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }

    function selectedDate(date: Moment | null | Dayjs) {
        if (date) {
            setEvent({ ...event, date: formatDate(date.toDate()), author: user.username })
        }

    }

    const onReset = () => {
        formRef.current?.resetFields();
    }

    function submitForm() {
        props.submit({ ...event, author: user.username })
        console.log(JSON.stringify(event))
    }



    return (
        <Form onFinish={submitForm}
            ref={formRef}
        >
            <Form.Item
                label='Выберите башню'
                name='tower'
                rules={[rules.required()]}
            >
                <Select
                    onChange={(tower: number) => setEvent({ ...event, tower: initialState.towers[tower] })}
                >
                    {initialState.towers.map((item, i) => (
                        <Select.Option key={i} >
                            {item}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label='Выберите этаж'
                name='floor'
                rules={[rules.required()]}>
                <Select
                    onChange={(floor: number) => setEvent({ ...event, floor: initialState.floors[floor] })
                    }>
                    {initialState.floors.map((item, i) => (
                        <Select.Option key={i}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label='Выберите переговорную'
                name='meeatingRoom'
                rules={[rules.required()]}>
                <Select
                    onChange={(meetingRoom: number) => setEvent({ ...event, meetingRoom: initialState.meetingRooms[meetingRoom] })
                    }>
                    {initialState.meetingRooms.map((item, i) => (
                        <Select.Option key={i}>
                            {item}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label='Комментарий'
                name='comment'
                rules={[rules.required()]}
            >
                <Input onChange={(e) => setEvent({ ...event, comment: e.target.value })}
                    value={event.comment}
                />
            </Form.Item>
            <Form.Item
                label='Дата события'
                name='date'
                rules={[rules.required(), rules.isDateAfter('Нельзя добавлять событие в прошлом')]}
            >
                <DatePicker onChange={(date: Dayjs | null) => selectedDate(date)} />
            </Form.Item>

            <Form.Item
                label='Выберите участника'
                name='guest'
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
                    {props.guests.map(guest => (
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Row justify='end'>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Добавить
                </Button>
                <Button
                    htmlType='button'
                    onClick={onReset}
                >
                    Очистить</Button>
            </Row>
        </Form>
    )
}

export default EventForm