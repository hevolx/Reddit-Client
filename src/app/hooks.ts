import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/** Typed wrapper around `useDispatch` — infers the full `AppDispatch` type. */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/** Typed wrapper around `useSelector` — provides `RootState` inference. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
