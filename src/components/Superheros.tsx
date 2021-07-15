import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/use-typed-selector';
import { useActions } from 'hooks/use-actions';
import axios from 'axios';
import './styles/list.css';
import './styles/card.css';
import { Container} from './styled-components'
import Skleton from 'react-loading-skeleton';
import Header from './Header';

const Superheros = () => {
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    // Fetch the heros here 
    const heros = useTypedSelector(({ heros }) => {
        return heros;
    });

    const { fetchHeros } = useActions()

    const fetchHerosLocal = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=94dddfd6f9cb5b1039abdd069b9759c9&hash=62c88e897176b4180a3f1bbebce7d7bd&ts=1&limit=20&offset=${offset}`);
            fetchHeros(response.data.data.results);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error(err)
        }
    }, [offset, fetchHeros]);

    useEffect(() => {
        fetchHerosLocal();
    }, [fetchHerosLocal]);

    const getCartAPI = useMemo(() => {
        if (heros.length > 0) {
            return heros.map((hero: any, i: number) => <a className="card" href={`/#/comics/${hero.id}`}>
                <div className="imgWrap">
                    <img src={`${hero.thumbnail.path}/portrait_incredible.${hero.thumbnail.extension}`}
                        alt="" />
                </div>
                <div className="body">
                    <div className="text">Captain America</div>
                    <div className="text-footer">Sam Wilson</div>
                </div>
            </a>
            );
        }
        return null;
    }, [heros]);

    return (
        <>
        <Header/>
        <Container>
           
            {!loading &&  <><div className="grid">
                {getCartAPI}
            </div>
            <div className="btn-container">
                <button className="button" onClick={() => setOffset(prevState => prevState + 1)}>Load More</button>
            </div></>
        }
        {loading && <><Skleton count = {50} />
        </>}
            
            
        </Container></>
    );
};

Superheros.propTypes = {

};

export default Superheros;