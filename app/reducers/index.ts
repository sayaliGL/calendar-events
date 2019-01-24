// import * as fromEventAction from './EventAction' 
// import { combineReducers } from 'redux'
// import { any } from 'prop-types';
//     export interface State{
//         eventAction : fromEventAction.State
//     } 
//     export const initialState: State = {
//         eventAction:fromEventAction.initialState
//     }
//     export const reducer = combineReducers<State>({
//         eventAction : fromEventAction.reducer
//     })


import { combineReducers } from 'redux';
import * as EventAction from './EventAction';

const allReducers = combineReducers({
  events: EventAction.reducer,
})

export default allReducers



