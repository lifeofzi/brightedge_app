import { Link } from "react-router-dom";
import styles from "../css/Appbar.module.css";

function AppBar() {
  return (
    <div className={styles.appbar}>
      <Link to="/">
        <img
          src="/logo_white.svg"
          alt="BrightEdge Logo"
          className={styles.logo}
        />
      </Link>
    </div>
  );
}

export default AppBar;
