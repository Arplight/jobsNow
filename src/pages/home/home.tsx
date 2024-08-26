import { useDispatch, useSelector } from "react-redux";
import JobCard from "../../components/common/job_card/jobCard";
import { useEffect } from "react";
import { fetchJobs } from "../../lib/api/api";
import { IJob } from "../../lib/types/apiTypes";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { MdErrorOutline } from "react-icons/md";
import ErrorMessage from "../../components/common/error_messge/errorMessage";
import useSpinner from "../../lib/utils/hooks/useSpinner";
import { IJobsInit } from "../../lib/redux/slices/jobsSlice";
import useObserver from "../../lib/utils/hooks/useObserver";

const Home = () => {
  // States
  const { jobs, meta, loading, hasMore, error }: IJobsInit = useSelector(
    (state: RootState) => state.jobs
  );

  // dispatch instance
  const dispatch: AppDispatch = useDispatch();

  // Initial data fetching
  useEffect(() => {
    if (jobs === null) dispatch(fetchJobs(0));
  }, [dispatch, jobs]);

  // spinner handler
  useSpinner({ stateIsLoading: loading });

  // intersection Observer
  const { lastRef } = useObserver({
    loading,
    hasMore,
    onLoadMore: () => {
      dispatch(fetchJobs(meta?.next || 0));
    },
  });

  const skills = [
    {
      skillName: "operation monitoring",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "operation monitoring",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "operation monitoring",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "operation monitoring",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "operation monitoring",
      skillLink: "f4a6f053-2cac-44fc-a87a-5368d7ca46ed",
    },
    {
      skillName: "operation monitoring",
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
          {/* jobs count */}
          <h1
            className="font-hero font-color"
            style={{ marginBottom: 16, paddingLeft: 16 }}
          >
            All Jobs ({jobs && jobs.length > 0 ? meta?.count : "0"})
          </h1>
          {/* all jobs */}
          {jobs && jobs.length > 0 ? (
            <ul className="jobs-grid">
              {jobs.map((job: IJob, index: number) => (
                <li
                  key={job.id}
                  ref={index === jobs.length - 1 ? lastRef : undefined}
                >
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
              errorIcon={<MdErrorOutline size={100} />}
              errorMessage="There are no jobs yet"
            />
          )}
        </>
      )}
    </>
  );
};

export default Home;
