import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTypedSelector } from 'hooks/use-typed-selector';
import { useActions } from 'hooks/use-actions';
import axios from 'axios';
import { Container, Input } from 'components/styled-components'
import { List } from 'components/styled-components/list';
import Skleton from 'react-loading-skeleton';
import Header from 'components/Header';
import ListSuperHeros from 'components/List/ListSuperHeros';
import { HeroInterface } from 'Interfaces/Heros';
import { getSuperHerosAPI } from 'config/apis';
import 'Styles/Card.scss';
import 'Styles/Search.scss';

interface formInterface {
    search: string;
}

const Superheros = () => {
    const limit = 20;
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [formData, setFormData] = useState<formInterface>({ search: '' });
    const [localHeros, setLocalHeros] = useState<HeroInterface[]>([]);
    const [noResultFound, setNoResultFound] = useState<boolean>(true);

    const heros = useTypedSelector(({ heros }) => {
        return heros;
    });

    const { fetchHeros } = useActions();

    const fetchHerosLocal = useCallback(async () => {
        if (heros.length > 0) return;
        try {
            setLoading(true);
            const response = await axios.get(getSuperHerosAPI(0));
            fetchHeros(response.data.data.results);
            setLocalHeros(response.data.data.results);
            setItem('totalHeros', response.data.data.total);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error(err)
        }
    }, [fetchHeros, heros]);

    const setItem = (key:string , value:string) => {
        localStorage.setItem(key,  value);
    };

    const getItem = (key:string) => {
        return localStorage.getItem(key);
    };

    const loadMore = useCallback(async () => {
        setLoadingMore(true);
        try {
            const response = await axios.get(getSuperHerosAPI(offset + limit));
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

    const getCartAPI = useMemo(() => {
        if (localHeros.length > 0) {
            return <ListSuperHeros heros={localHeros} />
        }
        return null;
    }, [localHeros]);

    const searchHeros = useCallback((data: HeroInterface[], str: string) => {
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

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        searchHeros(heros, value);
    }, [searchHeros, heros, formData]);

    const getLoadMoreBtn = useMemo(() => {
        let total = getItem('totalHeros');
        return total
               && heros.length <= parseInt(total)
               && !loading 
               && !loadingMore 
               && formData.search === '' 
               && <button className="button"
                onClick={() => loadMore()}>
                Load More
            </button>
    }, [heros, loading, formData, loadMore, loadingMore]);


    useEffect(() => {
        if (heros.length > 0 && localHeros.length === 0 && noResultFound) {
            setLocalHeros(heros);
        }
    }, [heros, localHeros, noResultFound]);

    useEffect(() => {
        fetchHerosLocal();
    }, [fetchHerosLocal]);
    
    return (
        <>
            <Header />
            <List />
            <div className="search-container">
                <div className="search-childs">
                    <Input
                        placeholder="Search heros"
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
                    { getLoadMoreBtn }
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