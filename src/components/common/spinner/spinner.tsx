import { PulseLoader } from "react-spinners";
import Styles from "./spinner.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";

const Spinner = () => {
  // spinner state
  const spinnerIsShown: boolean = useSelector(
    (state: RootState) => state.spinner.isShown
  );
  return (
    <div className={`${Styles.spinner} ${spinnerIsShown && "show-spinner"} `}>
      <PulseLoader size={20} />
    </div>
  );
};

export default Spinner;
