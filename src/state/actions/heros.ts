import { ActionTypes } from "state/action-types";
import { HeroInterface } from 'Interfaces/Heros';


export interface Heros {
    heros: HeroInterface[];
}

export interface FetchHerosAction {
    type: ActionTypes.fetchHeros,
    payload: HeroInterface[]
}

export const fetchHeros = (data:Heros) => {
    return {
        type: ActionTypes.fetchHeros,
        payload: data
    }
}


