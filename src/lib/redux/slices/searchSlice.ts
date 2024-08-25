import { createSlice } from "@reduxjs/toolkit";

export interface ISearchInit {
  searchQuery: string;
}
const SearchSlice = createSlice({
  name: "search",
  initialState: <ISearchInit>{ searchQuery: "" },
  reducers: {
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});
export default SearchSlice.reducer;
export const { updateSearchQuery } = SearchSlice.actions;
