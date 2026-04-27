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
    /** Sets the free-text search query. */
    setQuery(state, action) {
      state.query = action.payload;
    },
    /** Sets the active subreddit category, or null to show all. */
    setCategory(state, action) {
      state.category = action.payload;
    },
    /** Resets both query and category to their initial empty state. */
    clearFilter(state) {
      state.query = '';
      state.category = null;
    }
  },
});

export const { setQuery, setCategory, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
