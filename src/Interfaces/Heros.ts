export interface HeroInterface {
    id:          number;
    name:        string;
    description: string;
    modified:    string;
    thumbnail:   Thumbnail;
    resourceURI: string;
    comics:      Comics;
    series:      Comics;
    stories:     Stories;
    events:      Comics;
    urls:        URL[];
}

export interface ComicsItem {
    resourceURI: string;
    name:        string;
}

export interface Stories {
    available:     number;
    collectionURI: string;
    items:         StoriesItem[];
    returned:      number;
}

export interface StoriesItem {
    resourceURI: string;
    name:        string;
    type:        any;
}

export interface Thumbnail {
    path:      string;
    extension: string;
}

export interface URL {
    type: string;
    url:  string;
}

export interface Comics {
    available:     number;
    collectionURI: string;
    items:         ComicsItem[];
    returned:      number;
}