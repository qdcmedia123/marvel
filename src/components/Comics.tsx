import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/card.css';
import './styles/model.css';
import './styles/skew-header.css';
import { Avatar, Container } from './styled-components/index';
import useOnClickOutside from "hooks/useOnClickOutside";
import Skleton from 'react-loading-skeleton';
import ListComics from './List/ListComics';
import ComicModel from 'components/Models/ComicModel';
import Header from './Header';
import { useTypedSelector } from 'hooks/use-typed-selector';


interface ParamTypes {
    id: string;
}

const Comics = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { id } = useParams<ParamTypes>();
    const [comics, setComics] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentComic, setCurrentCmc] = useState<any>({ description: '' });
    const [containerHeigh, setContainerHeight] = useState<any>(100);
    const [popUpisActive, setPoupActive] = useState<boolean>(false);

    const heros = useTypedSelector(({ heros }) => {
        return heros;
    });

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

    };

    const getComicsUI = useMemo(() => {
        if (comics.length > 0) {
            return <ListComics comics = {comics} setCurrentComic = {setCurrentComic}/>
        }
        return null;
    }, [comics])

    useEffect(() => {
        if (!loading && comics.length > 0) {
            const height = document.getElementById('container')?.clientHeight;
            setContainerHeight(height)
        }
    }, [loading, comics]);

    const getModel = useMemo(() => {
        if (Object.entries(currentComic).length > 0 && popUpisActive) {
            return <ComicModel currentComic = { currentComic} refP = {ref} containerHeigh = {containerHeigh}/>;
        }
        return null;
    }, [currentComic, containerHeigh, popUpisActive]);

    const getAvatarLink = useMemo(() => {
        console.log(typeof id);
        console.log(heros)
        if(heros.length > 0) {
            const getFiltered = heros.filter((hero: any) => {
               if (hero.id === parseInt(id)) return true;
            });

            if(getFiltered) {
                return `${getFiltered[0].thumbnail.path}/portrait_incredible.${getFiltered[0].thumbnail.extension}`;
            }
        }
        return null;
    }, [heros, id])
    const styles = {
        backgroundImage: "url(" + "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" + ")",
    }

    console.log(getAvatarLink);
    return (
        <>
            {getModel}
            <Header/>
            <div className = "skew-container">
                <div className = "comic-parent">
                     <div className = "col parent-title">
                         My Name
                     </div>
                     {getAvatarLink && <Avatar link = {getAvatarLink}/>}
                     {/* <div className = "col company-header-avatar" style = {styles}>
                      
                     </div> */}
                </div>
            </div>
            <Container id="container" comicContainer>
                <div className = "container-title">
                    Comics
                </div>
                {comics.length === 0 &&  !loading && <div className = "nofify">No comics found</div>}
                {!loading && <div className="grid">
                    {getComicsUI}
                </div>}
                {loading && <Skleton count={50} />}
            </Container>
        </>

    );
};

export default Comics;