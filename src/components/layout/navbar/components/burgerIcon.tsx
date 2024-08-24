import { FC } from "react";
import Styles from "../navbar.module.scss";
import { IBurgerIcon } from "../../../../lib/types/propTypes";
const BurgerIcon: FC<IBurgerIcon> = ({ openMenu, setOpenMenu }) => {
  return (
    <button
      className={`${Styles.burgerIcon} ${openMenu && "open-burger"}`}
      onClick={() => setOpenMenu(!openMenu)}
      type="button"
      role="button"
      aria-label={openMenu ? "close-menu" : "open-menu"}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};

export default BurgerIcon;
