import Styles from "./searchBar.module.scss";
import Search from "/assets/icons/search.svg";
const SearchBar = () => {
  return (
    <div className={Styles.searchBar}>
      <input
        type="search"
        name="search-bar"
        id="search-bar"
        aria-label="search bar"
      />
      <button type="submit" role="button" aria-label="search button">
        <img src={Search} alt="search button" />
      </button>
    </div>
  );
};

export default SearchBar;
