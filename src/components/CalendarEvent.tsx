import { Calendar } from 'antd'
import React, { FC } from 'react'
import { IEvent } from '../models/IEvent'
import formatDate from './utils/date'
import { Dayjs } from 'dayjs'
import type { CellRenderInfo } from 'rc-picker/lib/interface';




interface CalendarEventProdps {
  events: IEvent[]
}

const CalendarEvent: FC<CalendarEventProdps> = ({ events }) => {

  const dateCellRender = (value: Dayjs) => {
    const formatedDate = formatDate(value.toDate())
    const currentDayEvent = events.filter(ev => ev.date === formatedDate)
    return (
      <div>
        {currentDayEvent.map((ev, i) => (
          <div key={i}>{ev.comment}</div>
        ))}
      </div>
    )
  };

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };

  return (
    <Calendar cellRender={cellRender} />
  )
}

export default CalendarEvent