import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showSpinner, hideSpinner } from "../../redux/slices/spinnerSlice";

const useSpinner = ({ stateIsLoading }: { stateIsLoading: boolean }) => {
  // dispatching
  const dispatch = useDispatch();
  //   handler
  useEffect(() => {
    if (stateIsLoading) {
      dispatch(showSpinner());
    } else {
      dispatch(hideSpinner());
    }
  }, [stateIsLoading, dispatch]);
};

export default useSpinner;
