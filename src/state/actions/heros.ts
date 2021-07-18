import { ActionTypes } from "state/action-types";

export interface HeroInterface {
    id: number;
    name: string;
    description: string | null;
    modified: string;
    thumbnail: object | null;
    resourceURI: string;
    comics: string;
    series: object;
    stories: object;
    events: object;
    urls: object;
 }

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