import { TbError404 } from "react-icons/tb";
import ErrorMessage from "../../components/common/error_messge/errorMessage";

const NotFound = () => {
  return (
    <ErrorMessage
      errorIcon={<TbError404 size={100} />}
      errorMessage="Page not found."
    />
  );
};

export default NotFound;
