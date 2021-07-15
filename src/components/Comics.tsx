import React, { useCallback, useEffect, useMemo, useState, useRef, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/card.css';
import './styles/model.css';
import { Container } from './styled-components/index';
import useOnClickOutside from "hooks/useOnClickOutside";
import { Model } from 'components/styled-components'
import Skleton from 'react-loading-skeleton';

interface ParamTypes {
    id: string;
}

type creators = [];

const Comics = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { id } = useParams<ParamTypes>();
    const [comics, setComics] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentComic, setCurrentCmc] = useState<any>({ description: '' });
    const [containerHeigh, setContainerHeight] = useState<any>(100);
    const [popUpisActive, setPoupActive] = useState<boolean>(false);

    useOnClickOutside(ref, () => setPoupActive(false));

    const fetchComicsById = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://gateway.marvel.com/v1/public/characters/${id}/comics?apikey=94dddfd6f9cb5b1039abdd069b9759c9&hash=62c88e897176b4180a3f1bbebce7d7bd&ts=1&limit=20&offset=0`)
            setComics(response.data.data.results);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }

    }, [id]);

    useEffect(() => {
        fetchComicsById();
    }, [fetchComicsById]);

    const setCurrentComic = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, comic: object) => {
        e.preventDefault();
        setPoupActive(true);
        setCurrentCmc(comic);
        console.log(comic)

    }

    const getLastNameAsStr = (creators: creators) => {

        if (creators.length < 0) return null;
        return creators.map((creator: any) => {
            const splitName = creator.name.split(' ');
            return splitName[splitName.length - 1];
        }).join(', ');
    }
    const getComicsUI = useMemo(() => {
        if (comics.length > 0) {
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
        return null;
    }, [comics])

    useEffect(() => {

        if (!loading && comics.length > 0) {
            const height = document.getElementById('container')?.clientHeight;
            setContainerHeight(height)
        }
    }, [loading, comics])

    const getModel = useMemo(() => {
        if (Object.entries(currentComic).length > 0 && popUpisActive) {
            return <Model height={containerHeigh}>
                <div className="popup-wrapper" ref={ref}>
                    <div className="popup-title">{currentComic.title}</div>
                    <div className="col-wrapper">
                        <div className="col">
                            <img src={`${currentComic.thumbnail.path}/portrait_uncanny.${currentComic.thumbnail.extension}`}
                                alt="" />
                        </div>
                        <div className="col">
                            <div className="col-text">
                                {currentComic.description}
                            </div>
                        </div>
                    </div>

                </div>
            </Model>;

        }

        return null;
    }, [currentComic, containerHeigh, popUpisActive])
    return (
        <>
            {getModel}
            <Container id="container">
                {comics.length === 0 && <div className = "nofify">No comics found</div>}
                {!loading && <div className="grid">
                    {getComicsUI}
                </div>}
                {loading && <Skleton count={50} />}
            </Container>
        </>

    );
};

export default Comics;