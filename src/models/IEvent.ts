import dayjs from "dayjs";

export interface IEvent {
    tower: string,
    meetingRoom: number | null,
    floor: number | null,
    author: string,
    guest: string,
    date:  string,
    comment: string,
}