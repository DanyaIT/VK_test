import { json } from "stream/consumers";
import { AppDispatch } from "../..";
import UserService from "../../../api/UserService";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "./../../../models/IUser";
import { EventActionEnum, SetEventAction, SetGuestAction } from "./types";


export const EventActionCreators = {
  setGuest: (payload: IUser[]):SetGuestAction => ({
    type: EventActionEnum.SET_GUESTS,
    payload,
  }),

  setEvent: (payload: IEvent[]):SetEventAction => ({
    type: EventActionEnum.SET_EVENTS,
    payload,
  }),

  fetchGuests: () => async (dispatch:AppDispatch) => {
    try {
        const response = await UserService.getUsers()
        dispatch(EventActionCreators.setGuest(response.data))
    } catch (error) {
        console.log(error)
    }
  },

  createEvent: (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]'
      const json = JSON.parse(events) as IEvent [];
      json.push(event)
      dispatch(EventActionCreators.setEvent(json))
      localStorage.setItem('events', JSON.stringify(json))

    } catch (error) {
      console.log(error)
    }
  },

  fetchEvents: (username: string) => async(dispatch: AppDispatch) => {
    try {
      const events = localStorage.getItem('events') || '[]' 
      const json = JSON.parse(events) as IEvent[]  
      const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username)
      dispatch(EventActionCreators.setEvent(currentUserEvents))
    } catch (error) {
      console.log(error)
    }
  }

};
