import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Styles from "./searchBar.module.scss";
import Search from "/assets/icons/search.svg";
import { AppDispatch, RootState } from "../../../../../lib/redux/store";
import {
  resetSearchQuery,
  updateSearchQuery,
} from "../../../../../lib/redux/slices/searchSlice";
import { resetSearch } from "../../../../../lib/redux/slices/jobsSlice";
import { IJob } from "../../../../../lib/types/apiTypes";

const SearchBar = () => {
  // reading states
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [searchParams] = useSearchParams();
  const searchResults = useSelector(
    (state: RootState) => state.jobs.searchResults
  ) as IJob[] | null;
  // instances
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  // query handler
  const queryHandler = useCallback(
    (query: string) => {
      if (query.length >= 3) {
        dispatch(updateSearchQuery(query));
        navigate(`/search?query=${encodeURIComponent(query)}`);
        setMenuIsOpened(true);
      } else {
        dispatch(resetSearch());
        dispatch(resetSearchQuery());
        setMenuIsOpened(false);
        if (query.length === 0) navigate("/");
      }
    },
    [dispatch, navigate]
  );

  // syncing with url params
  useEffect(() => {
    const queryParam: string | null = searchParams.get("query");
    if (queryParam) {
      dispatch(updateSearchQuery(queryParam));
      setQuery(queryParam);
    }
  }, [searchParams, dispatch]);

  // input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    queryHandler(value);
  };

  // menu handler
  const handleMenuSelection = (selectedQuery: string) => {
    queryHandler(selectedQuery);
    setQuery(selectedQuery);
    setMenuIsOpened(false);
  };

  return (
    <div className={Styles.searchContainer}>
      <div className={Styles.searchBar}>
        <input
          type="text"
          name="search-bar"
          id="search-bar"
          aria-label="search bar"
          placeholder="Search keyword"
          value={query}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          role="button"
          aria-label="search button"
          onClick={() => queryHandler(query)}
        >
          <img src={Search} alt="search button" />
        </button>
        {menuIsOpened && (
          <ul
            className={Styles.searchMenu}
            role="listbox"
            aria-labelledby="search-bar"
          >
            <button
              type="button"
              role="button"
              aria-label="close menu"
              onClick={() => setMenuIsOpened(false)}
            >
              <IoMdClose size={16} />
            </button>
            {searchResults?.map((result) => (
              <li
                key={result.id}
                onClick={() => handleMenuSelection(result.attributes?.title)}
              >
                <p className="font-color font-paragraph">
                  {result.attributes?.title}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
