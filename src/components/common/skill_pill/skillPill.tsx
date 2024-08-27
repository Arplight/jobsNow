import { FC } from "react";
import { Link } from "react-router-dom";
import { ISkillPill } from "../../../lib/types/propTypes";
import Styles from "./skillPill.module.scss";
import { PuffLoader } from "react-spinners";

const SkillPill: FC<ISkillPill> = ({
  skillName,
  skillLink,
  skillIsLoading,
}) => {
  return (
    <Link to={`/skill/${skillLink}`} className={Styles.skill} title={skillName}>
      {skillIsLoading ? (
        <div className={Styles.loading}>
          <PuffLoader size={20} color="#000000" data-testid="skill-loader"/>
        </div>
      ) : skillName?.length > 20 ? (
        skillName.slice(0, 20) + "..."
      ) : (
        skillName
      )}
    </Link>
  );
};

export default SkillPill;
