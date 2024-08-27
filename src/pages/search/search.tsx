import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/common/job_card/jobCard";
import SideMenu from "../../components/common/side_menu/sideMenu";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { useEffect } from "react";
import useSpinner from "../../lib/utils/hooks/useSpinner";
import { fetchSearchJobs } from "../../lib/api/api";
import ErrorMessage from "../../components/common/error_messge/errorMessage";
import { IJobsInit } from "../../lib/redux/slices/jobsSlice";
import { MdErrorOutline, MdSearchOff } from "react-icons/md";
import { IJob } from "../../lib/types/apiTypes";
import {
  ISearchInit,
  updateSearchHistory,
} from "../../lib/redux/slices/searchSlice";
import _ from "lodash";

const Search = () => {
  // States
  const { searchResults, searchMeta, searchLoading, searchError }: IJobsInit =
    useSelector((state: RootState) => state.jobs);
  const { searchQuery, searchHistory }: ISearchInit = useSelector(
    (state: RootState) => state.search
  );

  // checking for seeearch results
  const hasResults = searchResults && searchResults.length > 0;

  // Dispatch instance
  const dispatch: AppDispatch = useDispatch();

  // Search data fetching with debounce
  useEffect(() => {
    const searchHandler = _.debounce(() => {
      if (searchQuery.length >= 3) {
        dispatch(fetchSearchJobs(searchQuery));
      }
    }, 1000);
    searchHandler();
    return () => searchHandler.cancel();
  }, [dispatch, searchQuery]);

  // search history handler
  useEffect(() => {
    if (searchQuery.length >= 3) {
      if (hasResults) dispatch(updateSearchHistory(searchQuery));
    }
  }, [searchResults, dispatch]);

  // Spinner handler
  useSpinner({ stateIsLoading: searchLoading });

  return (
    <>
      {searchError ? (
        <ErrorMessage
          errorIcon={<MdErrorOutline size={100} />}
          errorMessage="There is something wrong."
        />
      ) : (
        <>
          {/* Search title */}
          {hasResults && (
            <h1
              className="font-hero font-color"
              style={{ marginBottom: 16, paddingLeft: 16 }}
            >
              “{searchQuery}” jobs ({searchMeta?.count || 0})
            </h1>
          )}
          {/* Main section */}
          <div className="main-section">
            {/* All search results */}
            <section>
              {hasResults ? (
                <ul className="jobs-grid">
                  {searchResults.map((job: IJob) => (
                    <li key={job.id}>
                      <JobCard
                        jobTitle={job.attributes?.title}
                        jobLink={job.id}
                        jobSkills={job.relationships.skills}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <ErrorMessage
                  errorIcon={<MdSearchOff size={100} />}
                  errorMessage="There are no search results available"
                />
              )}
            </section>
            {/* Side menu */}
            {searchHistory && searchHistory.length > 0 && (
              <SideMenu
                menuTitle="Search history"
                menuList={searchHistory.map((query) => ({
                  label: query,
                  path: `/search?query=${query}`,
                }))}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Search;
