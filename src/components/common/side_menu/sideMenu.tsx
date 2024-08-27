import { FC } from "react";
import Styles from "./sideMenu.module.scss";
import { ISideMenu } from "../../../lib/types/propTypes";
import { Link } from "react-router-dom";

const SideMenu: FC<ISideMenu> = ({ menuTitle, menuList }) => {
  return (
    <aside className={Styles.sideMenu}>
      <h1 className="font-main font-color">{menuTitle}:</h1>
      <ul>
        {menuList &&
          menuList.map((list , index) => (
            <li key={`${list.label}-${index}`}>
              <Link to={list.path} className="font-color">
                {list.label}
              </Link>
            </li>
          ))}
      </ul>
    </aside>
  );
};

export default SideMenu;
