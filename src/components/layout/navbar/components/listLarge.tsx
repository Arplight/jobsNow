import { Link } from "react-router-dom";
import Styles from "../navbar.module.scss";
import { FC } from "react";
import { INavList } from "../../../../lib/types/propTypes";
const ListLarge: FC<INavList> = ({ currentPage, pages }) => {
  return (
    <ul className={Styles.navListLarge}>
      {pages.map((page, index) => (
        <li key={index}>
          <Link
            className={`font-color font-paragraph ${
              currentPage === page.pageLink && "nav-link-active"
            }`}
            to={page.pageLink}
            aria-label={`${page.pageLabel}-page`}
          >
            {page.pageLabel}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ListLarge;
