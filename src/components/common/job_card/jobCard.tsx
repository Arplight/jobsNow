import { FC } from "react";
import { Link } from "react-router-dom";
import { IJobCard } from "../../../lib/types/propTypes";
import Styles from "./jobCard.module.scss";
import SkillPill from "../skill_pill/skillPill";

const JobCard: FC<IJobCard> = ({ jobTitle, jobSkills, jobLink }) => {
  return (
    <div className={`${Styles.card} card-hover`}>
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
          {jobSkills &&
            jobSkills.map((skill, index) => (
              <li key={index}>
                <SkillPill
                  skillName={skill.skillName}
                  skillLink={skill.skillLink}
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
