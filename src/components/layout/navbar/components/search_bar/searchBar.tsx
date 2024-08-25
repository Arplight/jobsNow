import { useDispatch } from "react-redux";
import Styles from "./searchBar.module.scss";
import Search from "/assets/icons/search.svg";
import { AppDispatch } from "../../../../../lib/redux/store";
import { updateSearchQuery } from "../../../../../lib/redux/slices/searchSlice";

const SearchBar = () => {
  const dispatch: AppDispatch = useDispatch();
  // Query Handler
  const queryHandler = (query: string) => {
    if (query.length >= 3) {
      dispatch(updateSearchQuery(query));
    }
  };
  return (
    <div className={Styles.searchContainer}>
      <div className={`${Styles.searchBar}`}>
        <input
          type="search"
          name="search-bar"
          id="search-bar"
          aria-label="search bar"
          placeholder="search keyword"
          onChange={(e) => queryHandler(e.target.value)}
        />
        <button type="submit" role="button" aria-label="search button">
          <img src={Search} alt="search button" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
