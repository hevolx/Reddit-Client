import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setCategory } from './filterSlice';

/**
 * Syncs the Redux filter state with URL search params (?q= and ?subreddit=).
 * On mount, reads params into state. On state change, updates the URL via replaceState.
 * The `isMounted` ref prevents overwriting the URL during the initial read.
 */
export function useUrlSync() {
  const query = useSelector((state: { filter: { query: string } }) => state.filter.query);
  const category = useSelector((state: { filter: { category: string | null } }) => state.filter.category);
  const dispatch = useDispatch();
  const isInitializing = useRef(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const searchParams = new URLSearchParams(window.location.search);
    const q = searchParams.get('q') ?? '';
    const subreddit = searchParams.get('subreddit');
    dispatch(setQuery(q));
    dispatch(setCategory(subreddit && subreddit.length > 0 ? subreddit : null));
  }, [dispatch]);

  useEffect(() => {
    if (isInitializing.current) {
      isInitializing.current = false;
      return;
    }
    if (typeof window === 'undefined') return;
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
    window.history.replaceState({}, '', qs ? `?${qs}${window.location.hash}` : window.location.pathname + window.location.hash);
  }, [query, category]);
}
