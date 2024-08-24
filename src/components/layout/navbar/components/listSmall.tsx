import { FC } from "react";
import { Link } from "react-router-dom";
import { INavList } from "../../../../lib/types/propTypes";

interface INavListSmall extends INavList {
  setOpenMenu: (isOpen: boolean) => void;
}
const ListSmall: FC<INavListSmall> = ({ currentPage, pages, setOpenMenu }) => {
  return (
    <ul>
      {pages.map((page, index) => (
        <li key={index}>
          <Link
            className={`font-color font-paragraph ${
              currentPage === page.pageLink && "nav-link-active"
            }`}
            to={page.pageLink}
            aria-label={`${page.pageLabel}-page`}
            onClick={() => setOpenMenu(false)}
          >
            {page.pageLabel}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ListSmall;
