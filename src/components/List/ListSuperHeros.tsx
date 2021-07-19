import { HeroInterface } from 'Interfaces/Heros';

interface Heros {
    heros: any;
}

const ListSuperHeros = ({ heros }: Heros) => {
    return heros.map((hero: HeroInterface, i: number) => <a key={i} className="card" href={`/#/comics/${hero.id}`}>
        <div className="imgWrap">
            <img src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                alt="" />
        </div>
        <div className="body">
            <div className="text">{hero.name}</div>
            <div className="text-footer">{hero.comics.available} {hero.comics.available <= 1 ? 'comic' : 'comics'}</div>
        </div>
    </a>
    );
}

export default ListSuperHeros;