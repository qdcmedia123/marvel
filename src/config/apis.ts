export const baseURI = 'http://gateway.marvel.com/v1/public';
export const apiKey = '94dddfd6f9cb5b1039abdd069b9759c9&hash=62c88e897176b4180a3f1bbebce7d7bd';
export const ts = 1;
export const limit = 20;

export const getComicAPI = (id:string) => {
    return `${baseURI}/characters/${id}/comics?apikey=${apiKey}&ts=${ts}&limit=${limit}&offset=0`
}

export const getSuperHerosAPI = (offset:number) => {
    return `${baseURI}/characters?apikey=${apiKey}&ts=${ts}&limit=${limit}&offset=${offset}`;
}
