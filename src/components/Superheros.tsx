import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/use-typed-selector';
import { useActions } from 'hooks/use-actions';
import axios from 'axios';
import { Container } from './styled-components'
import Skleton from 'react-loading-skeleton';
import Header from './Header';
import ListSuperHeros from './List/ListSuperHeros';
import './styles/list.css';
import './styles/card.css';
import './styles/search.css';

const Superheros = () => {
    const limit = 20;
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [formData, setFormData] = useState<any>({ search: '' });
    const [localHeros, setLocalHeros] = useState<any>([]);
    const [noResultFound, setNoResultFound] = useState(true);

    const heros = useTypedSelector(({ heros }) => {
        return heros;
    });

    const { fetchHeros } = useActions();
    
    const fetchHerosLocal = useCallback(async () => {
        if (heros.length > 0) return;
        try {
            setLoading(true);
            const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=94dddfd6f9cb5b1039abdd069b9759c9&hash=62c88e897176b4180a3f1bbebce7d7bd&ts=1&limit=${limit}&offset=0`);
            fetchHeros(response.data.data.results);
            setLocalHeros(response.data.data.results)
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error(err)
        }
    }, [fetchHeros, heros]);

    const loadMore = useCallback(async () => {
        setLoadingMore(true);
        console.log(offset);
        try {
            const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?apikey=94dddfd6f9cb5b1039abdd069b9759c9&hash=62c88e897176b4180a3f1bbebce7d7bd&ts=1&limit=${limit}&offset=${offset + limit}`);
            const { results } = response.data.data;
            fetchHeros(results);
            setLocalHeros([...localHeros, ...results]);
            setOffset((prevState) => prevState + 20);
            setLoadingMore(false);
        } catch (err) {
            console.error(err);
            setLoadingMore(false);
        }
    }, [offset, fetchHeros, localHeros]);

    useEffect(() => {
        if (heros.length > 0 && localHeros.length === 0 && noResultFound) {
            setLocalHeros(heros);
        }
    }, [heros, localHeros, noResultFound])

    useEffect(() => {
        fetchHerosLocal();
    }, [fetchHerosLocal]);

    const getCartAPI = useMemo(() => {
        if (localHeros.length > 0) {
            return <ListSuperHeros heros={localHeros} />
        }
        return null;
    }, [localHeros]);

    const searchHeros = useCallback((data: any, str: string) => {
        const regex = new RegExp(str.toLowerCase(), 'g');
        const mapSearch = data.filter((hero: any) => {
            if (hero.name.toLowerCase().match(regex)) return true;
            return false;
        });
        if (mapSearch.length === 0) {
            setNoResultFound(false);
        }
        setLocalHeros(mapSearch);
    }, []);

    const onChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData({ [name]: value });
        searchHeros(heros, value);
    }, [searchHeros, heros]);

    return (
        <>
            <Header />
            <div className="search-container">
                <div className="search-childs">
                    <input
                        placeholder="Search"
                        type="text"
                        name="search"
                        onChange={onChange}
                        value={formData.search ?? ''}
                    />
                </div>
            </div>
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
                        !loading && !loadingMore && formData.search === '' &&
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

export default Superheros;