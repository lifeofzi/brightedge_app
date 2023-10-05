import { useRecoilValue } from "recoil";
import { urlErrorStateAtom } from "../store/atoms/DataGridState";
import styles from "../css/ErrorHandlingComponent.module.css";

function ErrorHandlingComponent() {
  const errors = useRecoilValue(urlErrorStateAtom);

  if (!errors || Object.keys(errors).length === 0) {
    return null; // Render nothing if there are no errors
  }

  return (
    <div className={styles.container}>
      {Object.entries(errors).map(([url, error]) => (
        <p key={url} className={styles.errorMessage}>
          {`${url}: ${error}`}
        </p>
      ))}
    </div>
  );
}

export default ErrorHandlingComponent;
