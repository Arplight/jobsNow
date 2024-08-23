import { FC } from "react";
import { Link } from "react-router-dom";
import { ISkillPill } from "../../../lib/types/propTypes";
import Styles from "./skillPill.module.scss";

const SkillPill: FC<ISkillPill> = ({ skillName, skillLink }) => {
  return (
    <Link to={skillLink} className={Styles.skill}>
      {skillName?.length > 20 ? skillName.slice(0, 20) + "..." : skillName}
    </Link>
  );
};

export default SkillPill;
