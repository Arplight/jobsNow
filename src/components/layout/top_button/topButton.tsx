import { IoIosArrowUp } from "react-icons/io";
import Styles from "./topButton.module.scss";
import useScrollHandler from "../../../lib/utils/hooks/useScrollHandler";

const TopButton = () => {
  // scroll target handler
  const { isTarget } = useScrollHandler(300);
  // elevator
  const elevator = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      className={`${Styles.topButton} ${isTarget && "show-elevator"}`}
      aria-label="top button"
      onClick={elevator}
    >
      <IoIosArrowUp />
    </button>
  );
};

export default TopButton;
