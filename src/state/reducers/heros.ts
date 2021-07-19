import {Action, ActionTypes} from 'state/action-types';
import { Heros } from 'state/actions'

export const herosReducers = (state: Heros[] = [], action:Action) => {
    switch(action.type) {
        case ActionTypes.fetchHeros:
            return [...state, ...action.payload];
        default:
            return state;
    }
}
