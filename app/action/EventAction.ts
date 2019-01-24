// import { Events } from "../components/Events";
import EventModel from "../models/EventModel";
import { any, string } from "prop-types";

export enum ActionType {
  ADD_EVENT = '[EventAction] ADD_EVENT',
  PREVIOUS_EVENT = '[EventAction] PREVIOUS_EVENT',
  NEXT_EVENT = '[EventAction] NEXT_EVENT',
  TODAY_EVENT = '[EventAction] TODAY_EVENT',
  DELETE_EVENT = '[EventAction] DELETE_EVENT',
  EDIT_EVENT ='[EventAction] EDIT_EVENT',
  UPDATE_EVENT = '[EventAction] UPDATE_EVENT'
}



let id = 0;
export interface AddEventAction { type: ActionType.ADD_EVENT, payload: { events: EventModel } }
export interface PreviousEventAction { type: ActionType.PREVIOUS_EVENT, payload: { previousDate: any } }
export interface NextEventAction { type: ActionType.NEXT_EVENT, payload: { nextDate: any } }
export interface TodayEventAction { type: ActionType.TODAY_EVENT, payload: { todayDate: any } }
export interface DeleteEventAction { type: ActionType.DELETE_EVENT, payload: { id : number } }
export interface EditEventAction { type: ActionType.EDIT_EVENT, payload: { id : number } }
export interface UpdateEventAction { type: ActionType.UPDATE_EVENT, payload: { events: EventModel } }


export const addNewEvent = (id:number,eventTitle: string, startTime: Date, endTime: Date) => {
  return {
    type: ActionType.ADD_EVENT,
    payload: {
      events: {
        id: id,
        title: eventTitle,
        startTime: startTime,
        endTime: endTime
      }
    }
  }
}

export const perviousEvent = (previousDate: any) => {
  return {
    type: ActionType.PREVIOUS_EVENT,
    payload: { previousDate }
  }
}

export const nextEvent = (nextDate: any) => {
  return {
    type: ActionType.NEXT_EVENT,
    payload: { nextDate }
  }
}

export const todayEvent = (todayDate: any) => {
  return {
    type: ActionType.TODAY_EVENT,
    payload: { todayDate }
  }
}

export const deleteEvent = (id: number) => {
  return {
    type: ActionType.DELETE_EVENT,
    payload: { id }
  }
}

export const editEvent = (id: number) => {
  return {
    type: ActionType.EDIT_EVENT,
    payload: { id }
  }
}


export const updateEvent = (id:number,eventTitle: string, startTime: Date, endTime: Date) => {
  return {
    type: ActionType.UPDATE_EVENT,
    payload: {
      events: {
        id: id,
        title: eventTitle,
        startTime: startTime,
        endTime: endTime
      }
    }
  }
}

export type Action = AddEventAction | PreviousEventAction | NextEventAction | TodayEventAction | DeleteEventAction | EditEventAction | UpdateEventAction