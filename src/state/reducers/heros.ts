import {Action, ActionTypes} from '../action-types';
import { Heros } from '../actions'

export const herosReducers = (state: Heros[] = [], action:Action) => {
    switch(action.type) {
        case ActionTypes.fetchHeros:
            return [...state, ...action.payload];
        default:
            return state;
    }
}
