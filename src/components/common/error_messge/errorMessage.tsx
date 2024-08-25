import { FC } from "react";
import { IErrorMessage } from "../../../lib/types/propTypes";

const ErrorMessage: FC<IErrorMessage> = ({ errorIcon, errorMessage }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        height: "80vh",
        padding: 32,
      }}
    >
      {errorIcon}
      <h1 className="font-hero font-color">{errorMessage}</h1>
    </div>
  );
};

export default ErrorMessage;
