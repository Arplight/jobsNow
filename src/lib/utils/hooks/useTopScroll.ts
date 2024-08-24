import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTopScroll = () => {
  // current path
  const { pathname } = useLocation();
  //   scroll to top upon pathname changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
};

export default useTopScroll;
