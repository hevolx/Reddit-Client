import { createSlice } from '@reduxjs/toolkit';

interface FilterState {
  query: string;
  category: string | null;
}

const initialState: FilterState = {
  query: '',
  category: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    clearFilter(state) {
      state.query = '';
      state.category = null;
    }
  },
});

export const { setQuery, setCategory, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
