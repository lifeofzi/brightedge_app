import { useRecoilValue } from "recoil";
import { urlErrorStateAtom } from "../store/atoms/AtomStates";
import styles from "../css/ErrorHandlingComponent.module.css";
import { Alert } from "@mui/material";
import { getErrorMessage } from "../utils/ErrorUtils";

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
