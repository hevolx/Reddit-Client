import { useDispatch } from 'react-redux';
import { setQuery, setCategory } from './filterSlice'

export function useUrlSync() {
  const dispatch = useDispatch();
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  dispatch(setQuery(searchParams.get("q")));
  dispatch(setCategory(searchParams.get("subreddit")));
}