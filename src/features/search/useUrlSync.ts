import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setCategory } from './filterSlice';

export function useUrlSync() {
  const query = useSelector((state: { filter: { query: string } }) => state.filter.query);
  const category = useSelector((state: { filter: { category: string } }) => state.filter.category);
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get('q') ?? '';
    const subreddit = searchParams.get('subreddit');
    dispatch(setQuery(q));
    dispatch(setCategory(subreddit && subreddit.length > 0 ? subreddit : null));
    isMounted.current = true;
  }, [dispatch]);

  useEffect(() => {
    if (!isMounted.current) return;
    const searchParams = new URLSearchParams(window.location.search);
    if (query) {
      searchParams.set('q', query);
    } else {
      searchParams.delete('q');
    }
    if (category) {
      searchParams.set('subreddit', category);
    } else {
      searchParams.delete('subreddit');
    }
    const qs = searchParams.toString();
    window.history.replaceState({}, '', qs ? `?${qs}` : window.location.pathname);
  }, [query, category]);
}
