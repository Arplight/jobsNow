import { Outlet } from "react-router-dom";
import Styles from "./wrapper.module.scss";
const Wrapper = () => {
  return (
    <main className={`${Styles.wrapper} container`}>
      <Outlet />
    </main>
  );
};

export default Wrapper;
