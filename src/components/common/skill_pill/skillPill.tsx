import { FC } from "react";
import { Link } from "react-router-dom";
import { ISkillPill } from "../../../lib/types/propTypes";
import Styles from "./skillPill.module.scss";

const SkillPill: FC<ISkillPill> = ({ skillName, skillLink }) => {
  return (
    <Link to={`/skill/${skillLink}`} className={Styles.skill} title={skillName}>
      {skillName?.length > 20 ? skillName.slice(0, 20) + "..." : skillName}
    </Link>
  );
};

export default SkillPill;
