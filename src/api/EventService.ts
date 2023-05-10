import axios, { AxiosResponse } from "axios";
import { IEvent } from "../models/IEvent";

export default class EventService{
    static async getEvents():Promise<AxiosResponse<IEvent[]>>{
        return axios.get<IEvent[]>('./event.json')
    }


}