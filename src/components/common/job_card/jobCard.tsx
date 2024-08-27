import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IJobCard } from "../../../lib/types/propTypes";
import Styles from "./jobCard.module.scss";
import SkillPill from "../skill_pill/skillPill";
import { resetSkillsList } from "../../../lib/redux/slices/skillSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../lib/redux/store";
import { ISkillResponse } from "../../../lib/types/apiTypes";
import { fetchSkills } from "../../../lib/api/api";
import useLazyLoad from "../../../lib/utils/hooks/useLazyLoad";

const JobCard: FC<IJobCard> = ({ jobTitle, jobSkills, jobLink }) => {
  // states
  const [currentSkills, setCurrentSkills] = useState<ISkillResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // instances
  const dispatch = useDispatch<AppDispatch>();

  // I Used lazy loading here to reduce the total request for each job card skills
  const { isVisible, elementRef } = useLazyLoad();

  // data fetching
  useEffect(() => {
    if (isVisible && jobSkills) {
      setIsLoading(true);
      dispatch(resetSkillsList());

      const skillPromises = jobSkills.map((skill) =>
        dispatch(fetchSkills(skill.id))
      );

      // I Used parallel fetching here to reduce the total time needed
      Promise.all(skillPromises)
        .then((response) => {
          const data = response
            .map((item) => item?.payload?.data?.skill || null)
            .filter(Boolean);
          setCurrentSkills(data as ISkillResponse[]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch related data", error);
          setIsLoading(false);
        });
    }
  }, [dispatch, jobSkills, isVisible]);
  return (
    <div ref={elementRef} className={`${Styles.card} card-hover`}>
      <Link to={`/job/${jobLink}`} style={{ width: "max-content" }}>
        <h1 className="font-main font-color" title={jobTitle}>
          {jobTitle?.length > 25 ? jobTitle.slice(0, 25) + "..." : jobTitle}
        </h1>
      </Link>

      <div>
        <p className="font-paragraph font-color" style={{ marginBottom: 12 }}>
          Related skills:
        </p>
        <ul className={Styles.skillsList}>
          {currentSkills.map((skill) => (
            <li key={skill.id}>
              <SkillPill
                skillName={skill.attributes.name}
                skillLink={skill.id}
                skillIsLoading={isLoading}
              />
            </li>
          ))}
        </ul>
      </div>
      <Link
        to={`/job/${jobLink}`}
        className={`font-paragraph font-color ${Styles.jobLink}`}
      >
        View job details
      </Link>
    </div>
  );
};

export default JobCard;
