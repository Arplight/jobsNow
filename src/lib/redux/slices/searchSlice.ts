import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISearchInit {
  searchQuery: string;
  searchHistory: string[];
}

// getting search history from local storage
const getStoredSearchHistory = (): string[] => {
  const storedHistory = localStorage.getItem("searchHistory");
  if (storedHistory) {
    return JSON.parse(storedHistory) || [];
  }
  return [];
};

const SearchSlice = createSlice({
  name: "search",
  initialState: <ISearchInit>{
    searchQuery: "",
    searchHistory: getStoredSearchHistory(),
  },
  reducers: {
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    updateSearchHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = [
        ...new Set([action.payload, ...state.searchHistory]),
      ];
      try {
        localStorage.setItem(
          "searchHistory",
          JSON.stringify(state.searchHistory)
        );
      } catch (error) {
        console.error("Failed to save search history to localStorage", error);
      }
    },
    resetSearchQuery: (state) => {
      state.searchQuery = "";
    },
  },
});

export default SearchSlice.reducer;
export const { updateSearchQuery, resetSearchQuery, updateSearchHistory } =
  SearchSlice.actions;
