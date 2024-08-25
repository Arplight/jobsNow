import { Outlet } from "react-router-dom";
import Styles from "./wrapper.module.scss";
import Spinner from "../../common/spinner/spinner";
const Wrapper = () => {
  return (
    <main className={`${Styles.wrapper} container`}>
      <Outlet />
      <Spinner />
    </main>
  );
};

export default Wrapper;
