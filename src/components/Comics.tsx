import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Avatar, Container } from 'components/styled-components/index';
import useOnClickOutside from 'hooks/useOnClickOutside';
import Skleton from 'react-loading-skeleton';
import ListComics from 'components/List/ListComics';
import ComicModel from 'components/Models/ComicModel';
import Header from 'components/Header';
import { useTypedSelector } from 'hooks/use-typed-selector';
import { CardStyles } from 'components/styled-components/card';
import { SkewHeaderStyle } from 'components/styled-components/skew-header'
import { ModelStyles } from 'components/styled-components/model';
import { ComicInterface } from 'Interfaces/Comic';
import { getComicAPI } from 'config/apis';
import { defaultCurrComic } from 'defaultStates/currentComic';

interface ParamTypes {
    id: string;
}

const Comics = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { id } = useParams<ParamTypes>();
    const [comics, setComics] = useState<ComicInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentComic, setCurrentCmc] = useState<ComicInterface>(defaultCurrComic);
    const [containerHeigh, setContainerHeight] = useState<number>(100);
    const [popUpisActive, setPoupActive] = useState<boolean>(false);

    const heros = useTypedSelector(({ heros }) => {
        return heros;
    });

    console.log(JSON.stringify(currentComic));

    useOnClickOutside(ref, () => setPoupActive(false));

    const fetchComicsById = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(getComicAPI(id));
            setComics(response.data.data.results);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }

    }, [id]);

    const setCurrentComic = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, comic: ComicInterface) => {
        e.preventDefault();
        setPoupActive(true);
        setCurrentCmc(comic);

    };

    const getComicsUI = useMemo(() => {
        if (comics.length > 0) {
            return <ListComics comics={comics} setCurrentComic={setCurrentComic} />
        }
        return null;
    }, [comics])

    
    const getModel = useMemo(() => {
        if (Object.entries(currentComic).length > 0 
            && popUpisActive 
            && containerHeigh
            ) {
            return <ComicModel 
                    currentComic={currentComic} 
                    refP={ref} 
                    containerHeigh={containerHeigh} 
                    />;
        }
        return null;
    }, [currentComic, containerHeigh, popUpisActive]);

    const getAvatarLink = useMemo(() => {
        if (heros.length > 0) {
            const getFiltered = heros.filter((hero: any) => {
                if (hero.id === parseInt(id)) return true;
                return false;
            });

            if (getFiltered) {
                return { link: `${getFiltered[0].thumbnail.path}/portrait_incredible.${getFiltered[0].thumbnail.extension}`, name: getFiltered[0].name };
            }
        }
        return null;
    }, [heros, id]);

    useEffect(() => {
        if (!loading && comics.length > 0) {
            const height = document.getElementById('container')?.clientHeight;
            if(height) setContainerHeight(height);
            
        }
    }, [loading, comics]);

    useEffect(() => {
        fetchComicsById();
    }, [fetchComicsById]);


    return (
        <>
            <ModelStyles />
            {getModel}
            <SkewHeaderStyle />
            <Header />
            <CardStyles />

            <div className="skew-container">
                <div className="comic-parent">
                    <div className="col parent-title">
                        {getAvatarLink && getAvatarLink.name}
                    </div>
                    {getAvatarLink && <Avatar link={getAvatarLink.link} />}
                </div>
            </div>
            
            <Container id="container" comicContainer>
                <div className="container-title">
                    {comics.length === 1 ? 'Comic' : 'Comics'}
                </div>
                {comics.length === 0 && !loading 
                 && <div className="nofify">No comics found</div>}
                {!loading && <div className="grid">
                    {getComicsUI}
                </div>}
                {loading && <Skleton count={50} />}
            </Container>
        </>

    );
};

export default Comics;