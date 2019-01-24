import { Action, ActionType } from "../action/EventAction";
import Event from './../models/EventModel'

export interface State {
  events: Event[],
  date: Date,
  editRecord: Event
}

const initialState: State = {
  events: [
    {
      startTime: "Mon Jan 21 2019 01:00:00 GMT+0530 (IST)",
      "endTime": "Mon Jan 21 2019 01:30:00 GMT+0530 (IST)",
      "title": "Event 1",
      "id": 1
    },
    {
      "startTime": "Sat Jan 19 2019 04:00:00 GMT+0530 (IST)",
      "endTime": "Sat Jan 19 2019 06:00:00 GMT+0530 (IST)",
      "title": "Event 2",
      "id": 2
    },
    {
      "startTime": "Tue Jan 22 2019 18:00:00 GMT+0530 (IST)",
      "endTime": "Tue Jan 22 2019 19:00:00 GMT+0530 (IST)",
      "title": "Event 3",
      "id": 3
    },
    {
      "startTime": "Sat May 23 2017 21:30:00 GMT+0530 (IST)",
      "endTime": "Sat May 23 2017 22:15:00 GMT+0530 (IST)",
      "title": "Event 4",
      "id": 4
    },
    {
      "startTime": "Sun May 24 2017 02:00:00 GMT+0530 (IST)",
      "endTime": "Sun May 24 2017 03:00:00 GMT+0530 (IST)",
      "title": "Event 5",
      "id": 5
    }
  ],
  date: new Date(),
  editRecord: null
}

export function reducer(State: State = initialState, action: Action) {
  switch (action.type) {
    case ActionType.ADD_EVENT: {
      return { ...State, events: [...State.events, action.payload.events]}
    }

    case ActionType.PREVIOUS_EVENT: {
      return { ...State, date: new Date(action.payload.previousDate._d) }
    }

    case ActionType.NEXT_EVENT: {
      return { ...State, date: new Date(action.payload.nextDate._d) }
    }

    case ActionType.TODAY_EVENT: {
      return { ...State, date: new Date(action.payload.todayDate._d) }
    }

    case ActionType.DELETE_EVENT: {
      return { ...State, events:[...State.events.filter(list => list.id !== action.payload.id)] }
    }

    case ActionType.EDIT_EVENT: {
      return { ...State, editRecord :State.events.filter(list => list.id == action.payload.id)[0] }
    }

    case ActionType.UPDATE_EVENT: {
      return { ...State, events: State.events.map(list => list.id == action.payload.events.id ? action.payload.events : list)}
    }

    default:
      return State
  }
}
