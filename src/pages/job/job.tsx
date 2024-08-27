import { useDispatch, useSelector } from "react-redux";
import RelatedCard from "../../components/common/related_card/relatedCard";
import SideMenu from "../../components/common/side_menu/sideMenu";
import { IJobInit, resetJobsList } from "../../lib/redux/slices/jobSlice";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { useEffect } from "react";
import { fetchJob, fetchJobList, fetchSkills } from "../../lib/api/api";
import { useLocation } from "react-router-dom";
import useSpinner from "../../lib/utils/hooks/useSpinner";
import ErrorMessage from "../../components/common/error_messge/errorMessage";
import { MdErrorOutline } from "react-icons/md";
import { ISkillResponse } from "../../lib/types/apiTypes";
import { ISkillInit, resetSkillsList } from "../../lib/redux/slices/skillSlice";

const Job = () => {
  // States
  const { loading, job, error, jobsList, jobsListLoading }: IJobInit =
    useSelector((state: RootState) => state.job);
  const { skillsList, skillsListLoading }: ISkillInit = useSelector(
    (state: RootState) => state.skill
  );
  // instances
  const dispatch: AppDispatch = useDispatch();
  const { pathname } = useLocation();

  // data fetching
  useEffect(() => {
    const currentId = pathname.split("/").pop();

    if (currentId) {
      dispatch(fetchJob(currentId)).then((response) => {
        if (response.payload) {
          // reseting lists
          dispatch(resetSkillsList());
          dispatch(resetJobsList());

          // fetching related skills
          const skillPromises: ISkillResponse[] =
            response.payload?.data?.job?.relationships?.skills.map(
              (skill: ISkillResponse) => dispatch(fetchSkills(skill.id))
            );

          // fetching related jobs
          // I Noticed that there is duplicated jobs so i filtered it
          const jobsArray = skillsList
            .map((skill) => skill.relationships.jobs)
            .flat();
          const uniqueJobs = Array.from(
            new Set(jobsArray.map((job) => job.id))
          );
          const jobsPromises = uniqueJobs.map((job: string) =>
            dispatch(fetchJobList(job)).unwrap()
          );

          // I Used parallel fetching here to reduce the total time needed
          Promise.all([...skillPromises, ...jobsPromises]).catch((error) =>
            console.error("Failed to fetch related data", error)
          );
        }
      });
    }
  }, [dispatch, pathname]);

  // spinner handler
  useSpinner({
    stateIsLoading: !(!loading && !skillsListLoading && !jobsListLoading),
  });

  return (
    <>
      {error ? (
        <ErrorMessage
          errorIcon={<MdErrorOutline size={100} />}
          errorMessage="There is something wrong."
        />
      ) : (
        <>
          {/* main title */}
          <h1 className="font-hero font-color" style={{ marginBottom: 24 }}>
            {(job && job.attributes?.title) || "Job title"}
          </h1>
          {/* main section */}
          {job && job.relationships?.skills.length > 0 ? (
            <>
              <div className="main-section">
                <section style={{ padding: 24, backgroundColor: "#ffffff" }}>
                  {/* related skills */}
                  <h2
                    className="font-color font-main"
                    style={{ marginBottom: 12 }}
                  >
                    Related Skills:
                  </h2>
                  <ul>
                    {skillsList &&
                      skillsList.map((skill: ISkillResponse , index) => (
                        <li key={`${index}-${skill.id}`} style={{ marginBottom: 16 }}>
                          <RelatedCard
                            relatedTitle={skill.attributes.name}
                            relatedImportance={skill.attributes.importance}
                            relatedLevel={skill.attributes.level}
                            relatedType={skill.attributes.type}
                            relatedLink={`/skill/${skill.id}`}
                          />
                        </li>
                      ))}
                  </ul>
                </section>

                {/* side menu */}
                <SideMenu
                  menuTitle="Related Jobs"
                  menuList={
                    jobsList &&
                    jobsList.map((job) => {
                      return {
                        label: job.attributes.title,
                        path: `/job/${job.id}`,
                      };
                    })
                  }
                />
              </div>
            </>
          ) : (
            <ErrorMessage
              errorIcon={<MdErrorOutline size={100} />}
              errorMessage="There are no related skills yet."
            />
          )}
        </>
      )}
    </>
  );
};

export default Job;
