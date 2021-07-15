import { ActionTypes } from "state/action-types";

export interface Heros {
    heros: any;
}

export interface FetchHerosAction {
    type: ActionTypes.fetchHeros,
    payload: Heros[]
}

export const fetchHeros = (data:Heros) => {
    return {
        type: ActionTypes.fetchHeros,
        payload: data
    }
}