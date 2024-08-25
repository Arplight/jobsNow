import { useDispatch, useSelector } from "react-redux";
import RelatedCard from "../../components/common/related_card/relatedCard";
import SideMenu from "../../components/common/side_menu/sideMenu";
import { IJobInit } from "../../lib/redux/slices/jobSlice";
import { AppDispatch, RootState } from "../../lib/redux/store";
import { useEffect } from "react";
import { fetchJob } from "../../lib/api/api";
import { useLocation } from "react-router-dom";
import useSpinner from "../../lib/utils/hooks/useSpinner";
import ErrorMessage from "../../components/common/error_messge/errorMessage";
import { MdErrorOutline } from "react-icons/md";

const Job = () => {
  // States
  const { pathname } = useLocation();
  const { loading, job, error }: IJobInit = useSelector(
    (state: RootState) => state.job
  );
  // dispatch instance
  const dispatch: AppDispatch = useDispatch();

  // data fetching
  useEffect(() => {
    const currentId = pathname.split("/").pop();
    if (currentId) {
      dispatch(fetchJob(currentId));
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
                    {job.relationships?.skills.map((skill: { id: string }) => (
                      <li key={skill.id} style={{ marginBottom: 16 }}>
                        <RelatedCard
                          relatedTitle={skill.id}
                          relatedImportance="3.7"
                          relatedLevel="2.3"
                          relatedType="knowledge"
                          relatedLink={`/skill/${skill.id}`}
                        />
                      </li>
                    ))}
                  </ul>
                </section>

                {/* side menu */}
                <SideMenu
                  menuTitle="Related Jobs"
                  menuList={[
                    {
                      label: "Frontend Developer",
                      path: "/job/frontend-developer",
                    },
                    {
                      label: "Backend Developer",
                      path: "/job/backend-developer",
                    },
                    { label: "UI/UX Designer", path: "/job/ui-ux-designer" },
                    {
                      label: "Full Stack Developer",
                      path: "/jobs/full-stack-developer",
                    },
                    { label: "Data Scientist", path: "/job/data-scientist" },
                    { label: "DevOps Engineer", path: "/job/devops-engineer" },
                    { label: "Project Manager", path: "/job/project-manager" },
                    { label: "Product Manager", path: "/job/product-manager" },
                    {
                      label: "Quality Assurance Engineer",
                      path: "/job/qa-engineer",
                    },
                    {
                      label: "Mobile Developer",
                      path: "/job/mobile-developer",
                    },
                  ]}
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
