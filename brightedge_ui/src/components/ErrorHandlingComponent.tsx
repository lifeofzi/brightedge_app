import { useRecoilValue } from "recoil";
import { urlErrorStateAtom } from "../store/atoms/AtomStates";
import styles from "../css/ErrorHandlingComponent.module.css";
import { Alert } from "@mui/material";
import { AxiosError } from "axios";

const getErrorMessage = (error: unknown): string => {
  const axiosError = error as AxiosError;
  let errorMessage = axiosError.message; // default to the error message

  // If it's an Axios error with a response status code of 400, customize the message.
  if (axiosError.response && axiosError.response.status === 400) {
    errorMessage = "Error querying for invalid url.";
  }

  return errorMessage;
};

function ErrorHandlingComponent() {
  const errors = useRecoilValue(urlErrorStateAtom);

  if (!errors || Object.keys(errors).length === 0) {
    return null; // Render nothing if there are no errors
  }

  return (
    <div className={styles.container}>
      <Alert
        variant="outlined"
        severity="error"
        className={styles.errorMessage}
      >
        {Object.entries(errors).map(([url, error], index) => (
          <div key={url}>
            {`${url}: ${getErrorMessage(error)}`}
            {index < Object.entries(errors).length - 1 && <br />}
          </div>
        ))}
      </Alert>
    </div>
  );
}

export default ErrorHandlingComponent;
