import { useDispatch, useSelector } from "react-redux";
import RelatedCard from "../../components/common/related_card/relatedCard";
import SideMenu from "../../components/common/side_menu/sideMenu";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useSpinner from "../../lib/utils/hooks/useSpinner";
import { ISkillInit, resetSkillsList } from "../../lib/redux/slices/skillSlice";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { fetchJobList, fetchSkill, fetchSkills } from "../../lib/api/api";
import { MdErrorOutline } from "react-icons/md";
import ErrorMessage from "../../components/common/error_messge/errorMessage";
import { IJob, ISkillResponse } from "../../lib/types/apiTypes";
import { resetJobsList } from "../../lib/redux/slices/jobSlice";

const Skill = () => {
  // States
  const { loading, skillsListLoading, skill, error, skillsList }: ISkillInit =
    useSelector((state: RootState) => state.skill);
  const { jobsList, jobsListLoading } = useSelector(
    (state: RootState) => state.job
  );

  // Instances
  const dispatch = useDispatch<AppDispatch>();
  const { pathname } = useLocation();

  // Data fetching
  useEffect(() => {
    const currentId = pathname.split("/").pop();
    if (currentId) {
      dispatch(fetchSkill(currentId)).then((response) => {
        if (response.payload) {
          // reseting lists
          dispatch(resetSkillsList());
          dispatch(resetJobsList());
          
          // promises
          const skillPromises =
            response.payload?.data?.skill?.relationships?.skills.map(
              (skill: ISkillResponse) =>
                dispatch(fetchSkills(skill.id)).unwrap()
            );
          const jobsPromises =
            response.payload?.data?.skill?.relationships?.jobs.map(
              (job: IJob) => dispatch(fetchJobList(job.id)).unwrap()
            );

          // I Used parallel fetching here to reduce the total time needed
          Promise.all([...skillPromises, ...jobsPromises]).catch((error) =>
            console.error("Failed to fetch related data", error)
          );
        }
      });
    }
  }, [dispatch, pathname]);

  // Spinner handler
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
          {/* Main title */}
          <h1 className="font-hero font-color" style={{ marginBottom: 24 }}>
            {(skill && skill.attributes?.name) || "Job title"}
          </h1>

          {/* Main section */}
          <div className="main-section">
            <section style={{ padding: 24, backgroundColor: "#ffffff" }}>
              {/* Description */}
              <div style={{ marginBottom: 24 }}>
                <h2
                  className="font-color font-main"
                  style={{ marginBottom: 12 }}
                >
                  Description:
                </h2>
                <p className="font-color font-paragraph">
                  Skill description is not returned from the API, so this is
                  placeholder text.
                </p>
              </div>

              {/* Related jobs */}
              <h2 className="font-color font-main" style={{ marginBottom: 12 }}>
                Related Jobs:
              </h2>
              {skill && skill.relationships?.jobs?.length > 0 ? (
                <ul>
                  {jobsList &&
                    jobsList.map((job: IJob) => (
                      <li key={job.id} style={{ marginBottom: 16 }}>
                        <RelatedCard
                          relatedTitle={job.attributes?.title}
                          relatedImportance={skill.attributes?.importance}
                          relatedLevel={skill.attributes?.level}
                          relatedType={job.type}
                          relatedLink={`/job/${job.id}`}
                        />
                      </li>
                    ))}
                </ul>
              ) : (
                <ErrorMessage
                  errorIcon={<MdErrorOutline size={100} />}
                  errorMessage="There are no related jobs."
                />
              )}
            </section>

            {/* Side menu */}
            {skillsList && skillsList.length > 0 && (
              <SideMenu
                menuTitle="Related Skills"
                menuList={skillsList.map((skill) => ({
                  label: skill.attributes.name,
                  path: `/skill/${skill.id}`,
                }))}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Skill;
