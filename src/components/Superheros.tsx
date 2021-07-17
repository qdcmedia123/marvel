import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/use-typed-selector';
import { useActions } from 'hooks/use-actions';
import axios from 'axios';
import './styles/list.css';
import './styles/card.css';
import { Container } from './styled-components'
import Skleton from 'react-loading-skeleton';
import Header from './Header';
import ListSuperHeros from './List/ListSuperHeros';

const Superheros = (props:any) => {
    const limit = 20;
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const heros = useTypedSelector(({ heros }) => {
        return heros;
    });
    console.log(props);
    const { fetchHeros } = useActions()
    const fetchHerosLocal = useCallback(async () => {
        if(heros.length > 0) return;
        try {
            const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=94dddfd6f9cb5b1039abdd069b9759c9&hash=62c88e897176b4180a3f1bbebce7d7bd&ts=1&limit=20&offset=0`);
            fetchHeros(response.data.data.results);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error(err)
        }
    }, [fetchHeros, heros]);

    const loadMore = useCallback(async() => {
        setLoadingMore(true);
        console.log(offset);
        try {
            const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=94dddfd6f9cb5b1039abdd069b9759c9&hash=62c88e897176b4180a3f1bbebce7d7bd&ts=1&limit=20&offset=${offset+20}`);
            fetchHeros(response.data.data.results);
            setOffset((prevState) => prevState + 20);
            setLoadingMore(false);
        } catch(err) {
            console.error(err);
            setLoadingMore(false);
        }
    }, [offset, fetchHeros]);

    useEffect(() => {
        fetchHerosLocal();
    }, [fetchHerosLocal]);

    const getCartAPI = useMemo(() => {
        if (heros.length > 0) {
            return <ListSuperHeros heros={heros} />

        }
        return null;
    }, [heros]);

    return (
        <>
            <Header />
            <Container>
                {
                   !loading && 
                   <><div className="grid">
                    {getCartAPI}
                    </div>
                   </>
                }
                <div className="btn-container">
                    {
                      !loadingMore &&
                        <button className="button"
                            onClick={() => loadMore()}>
                            Load More
                        </button>
                    }

                    {
                        loadingMore && <button
                            className="button">Please wait...
                        </button>
                    }
                </div>
                
                {loading && <><Skleton count={50} />
                </>}
            </Container></>
    );
};

Superheros.propTypes = {

};

export default Superheros;