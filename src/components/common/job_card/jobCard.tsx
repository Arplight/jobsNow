import { FC } from "react";
import { Link } from "react-router-dom";
import { IJobCard } from "../../../lib/types/propTypes";
import Styles from "./jobCard.module.scss";
import SkillPill from "../skill_pill/skillPill";

const JobCard: FC<IJobCard> = ({ jobTitle, jobSkills, jobLink }) => {
  return (
    <div className={`${Styles.card} card-hover`}>
      <h1 className="font-main font-color">{jobTitle}</h1>
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
        to={jobLink}
        className={`font-paragraph font-color ${Styles.jobLink}`}
      >
        View job details
      </Link>
    </div>
  );
};

export default JobCard;
