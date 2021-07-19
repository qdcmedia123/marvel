import { herosReducers } from "state/reducers/heros";
import { combineReducers } from 'redux';


export interface StoreState {
    heros: any
}

export const reducers = combineReducers<StoreState>({
    heros:herosReducers
});

export type RootState = ReturnType<typeof reducers>;
