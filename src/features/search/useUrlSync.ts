import { useDispatch } from 'react-redux';
import { setQuery } from './filterSlice'

export function useUrlSync() {
  const dispatch = useDispatch();
  const paramsString = window.location.search;
  const searchParams = new URLSearchParams(paramsString);
  return dispatch(setQuery(searchParams.get("q")));
}