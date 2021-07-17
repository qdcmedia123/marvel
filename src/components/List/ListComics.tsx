interface ListComicsProps {
    comics: any;
    setCurrentComic: any;
}

type creators = [];

const ListComics = ({ comics, setCurrentComic }: ListComicsProps) => {
    const getLastNameAsStr = (creators: creators) => {
        if (creators.length < 0) return null;
        return creators.map((creator: any) => {
            const splitName = creator.name.split(' ');
            return splitName[splitName.length - 1];
        }).join(', ');
    }
    return comics.map((comic: any, i: number) => <a onClick={(e) => setCurrentComic(e, comic)} key={i} className="card" href="!#">
        <div className="imgWrap-comics">
            <img src={`${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`}
                alt="" />
        </div>
        <div className="body-comics">
            <div className="text">{comic.title}</div>
            <div className="text-footer gray-text">{getLastNameAsStr(comic.creators.items)}</div>
        </div>
    </a>
    );
}
export default ListComics;