import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setCategory } from './filterSlice';

export function useUrlSync() {
  const query = useSelector((state: { filter: { query: string } }) => state.filter.query);
  const dispatch = useDispatch();
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);

  useEffect(() => {
    dispatch(setQuery(searchParams.get("q")));
    dispatch(setCategory(searchParams.get("subreddit")));
  }, [])

  useEffect(() => {
    window.history.replaceState({}, '', `?q=${query}`);
  }, [query])
}