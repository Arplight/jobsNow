import { useDispatch, useSelector } from "react-redux";
import RelatedCard from "../../components/common/related_card/relatedCard";
import SideMenu from "../../components/common/side_menu/sideMenu";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useSpinner from "../../lib/utils/hooks/useSpinner";
import { ISkillInit, resetSkillsList } from "../../lib/redux/slices/skillSlice";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { fetchSkill } from "../../lib/api/api";
import { MdErrorOutline } from "react-icons/md";
import ErrorMessage from "../../components/common/error_messge/errorMessage";
import { ISkillResponse } from "../../lib/types/apiTypes";

const Skill = () => {
  // States
  const { pathname } = useLocation();
  const { loading, skill, error, skillsList }: ISkillInit = useSelector(
    (state: RootState) => state.skill
  );
  // dispatch instance
  const dispatch: AppDispatch = useDispatch();

  // data fetching
  useEffect(() => {
    const currentId = pathname.split("/").pop();
    if (currentId) {
      dispatch(fetchSkill(currentId)).then((response) => {
        if (response.payload) {
          // dispatch(resetSkillsList());
          // const skillPromises: ISkillResponse[] =
          //   response.payload?.data?.skill?.relationships?.skills.map(
          //     (skill: ISkillResponse) => dispatch(fetchSkill(skill.id))
          //   );
          // // I Used parallel fetching here to reduce the total time needed
          // Promise.all(skillPromises);
        }
      });
    }
  }, [dispatch, pathname]);

  // spinner handler
  useSpinner({ stateIsLoading: loading });
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
            {(skill && skill.attributes?.name) || "Job title"}
          </h1>
          {/* main section */}
          <div className="main-section">
            <section style={{ padding: 24, backgroundColor: "#ffffff" }}>
              {/* description */}
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
              {/* related jobs */}
              <h2 className="font-color font-main" style={{ marginBottom: 12 }}>
                Related Jobs:
              </h2>
              {skill && skill.relationships?.jobs?.length > 0 ? (
                <ul>
                  {skill.relationships?.jobs.map((job: { id: string }) => (
                    <li key={job.id} style={{ marginBottom: 16 }}>
                      <RelatedCard
                        relatedTitle={job.id}
                        relatedImportance={skill.attributes?.importance}
                        relatedLevel={skill.attributes?.level}
                        relatedType={skill.attributes?.type}
                        relatedLink={`/job/${job.id}`}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <ErrorMessage
                  errorIcon={<MdErrorOutline size={100} />}
                  errorMessage="There is no related jobs."
                />
              )}
            </section>
            {/* side menu */}
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
