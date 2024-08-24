import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Styles from "./navbar.module.scss";
import useScrollHandler from "../../../lib/utils/hooks/useScrollHandler";
import BurgerIcon from "./components/burgerIcon";
import ListLarge from "./components/listLarge";
import { TPages } from "../../../lib/types/propTypes";
import ListSmall from "./components/listSmall";
import SearchBar from "./components/search_bar/searchBar";

const Navbar = () => {
  // states
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { pathname: currentPage } = useLocation();

  // scroll effect handler
  const { isTarget } = useScrollHandler(300);
  // pages
  const pages: TPages[] = [
    { pageLabel: "Home", pageLink: "/" },
    { pageLabel: "Search", pageLink: "/search" },
    { pageLabel: "History", pageLink: "/history" },
  ];

  return (
    <nav className={`${Styles.navbar} ${isTarget ? "nav-up" : ""}`}>
      <div className="container">
        <span>
          <Link to="/">
            <h1 className="font-main font-color">JobsNow</h1>
          </Link>
        </span>
        <span>
          {/* large list */}
          <ListLarge currentPage={currentPage} pages={pages} />
          {/* burger icon */}
          <BurgerIcon openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </span>
        {/* small list */}
        <div
          className={`${Styles.navListSmall} ${openMenu && "show-small-list"}`}
        >
          <ListSmall
            setOpenMenu={setOpenMenu}
            currentPage={currentPage}
            pages={pages}
          />
        </div>
      </div>

      {/* searchbar */}
      {(currentPage === "/" || currentPage === "/search") && <SearchBar />}
    </nav>
  );
};

export default Navbar;
