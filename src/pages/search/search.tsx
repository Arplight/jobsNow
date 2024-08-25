import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/common/job_card/jobCard";
import SideMenu from "../../components/common/side_menu/sideMenu";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { useEffect } from "react";
import useSpinner from "../../lib/utils/hooks/useSpinner";
import { fetchJobs } from "../../lib/api/api";
import ErrorMessage from "../../components/common/error_messge/errorMessage";
import { IJobsInit } from "../../lib/redux/slices/jobsSlice";
import { MdErrorOutline } from "react-icons/md";
import { IJob } from "../../lib/types/apiTypes";
import { MdSearchOff } from "react-icons/md";
import { ISearchInit } from "../../lib/redux/slices/searchSlice";

const Search = () => {
  // States
  const { jobs, meta, loading, error }: IJobsInit = useSelector(
    (state: RootState) => state.jobs
  );
  const { searchQuery }: ISearchInit = useSelector(
    (state: RootState) => state.search
  );
  // dispatch instance
  const dispatch: AppDispatch = useDispatch();

  // Initial data fetching
  useEffect(() => {
    dispatch(fetchJobs({ searchQuery: searchQuery, nextJobs: 0 }));
  }, [dispatch, searchQuery]);

  // spinner handler
  useSpinner({ stateIsLoading: loading });

  const skills = [
    {
      skillName: "operation monitoring",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "active listening",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "information ordering",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "operation monitoring",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "active listening",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "information ordering",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
  ];
  return (
    <>
      {error ? (
        <ErrorMessage
          errorIcon={<MdErrorOutline size={100} />}
          errorMessage="There is something wrong."
        />
      ) : (
        <>
          {/* search title */}
          <h1
            className="font-hero font-color"
            style={{ marginBottom: 16, paddingLeft: 16 }}
          >
            “{searchQuery}” jobs ({jobs && jobs.length > 0 ? meta?.count : "0"})
          </h1>
          {/* main section */}
          <div className="main-section">
            {/* all search results */}
            <section>
              {jobs && jobs.length > 0 ? (
                <ul className="jobs-grid">
                  {jobs.map((job: IJob) => (
                    <li key={job.id}>
                      <JobCard
                        jobTitle={job.attributes?.title}
                        jobLink={job.id}
                        jobSkills={skills}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <ErrorMessage
                  errorIcon={<MdSearchOff size={100} />}
                  errorMessage="There is no search results available"
                />
              )}
            </section>
            {/* side menu */}
            <SideMenu
              menuTitle="Search history"
              menuList={[
                {
                  label: "Frontend Developer",
                  path: "/jobs/frontend-developer",
                },
                { label: "Backend Developer", path: "/jobs/backend-developer" },
                { label: "UI/UX Designer", path: "/jobs/ui-ux-designer" },
                {
                  label: "Full Stack Developer",
                  path: "/jobs/full-stack-developer",
                },
                { label: "Data Scientist", path: "/jobs/data-scientist" },
                { label: "DevOps Engineer", path: "/jobs/devops-engineer" },
                { label: "Project Manager", path: "/jobs/project-manager" },
                { label: "Product Manager", path: "/jobs/product-manager" },
                {
                  label: "Quality Assurance Engineer",
                  path: "/jobs/qa-engineer",
                },
                { label: "Mobile Developer", path: "/jobs/mobile-developer" },
              ]}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Search;
